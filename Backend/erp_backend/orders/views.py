from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Customer, Product, Order
from .serializers import CustomerSerializer, ProductSerializer, OrderSerializer
from accounts.permissions import IsSuperAdmin, IsManagerOrEmployee


# ✅ Optional combined permission for cleaner reuse
class IsSuperAdminOrManagerOrEmployee(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            IsSuperAdmin().has_permission(request, view)
            or IsManagerOrEmployee().has_permission(request, view)
        )


# -------------------- Customer ViewSet --------------------
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.AllowAny]  # Public access for order placement


# -------------------- Product ViewSet --------------------
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['category']
    search_fields = ['name', 'category']
    ordering_fields = ['price']


# -------------------- Order ViewSet --------------------
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('customer', 'product')
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ['create', 'list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsSuperAdminOrManagerOrEmployee()]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        try:
            # Create customer
            customer = Customer.objects.create(
                name=data.pop('customer_name'),
                mobile=data.pop('mobile'),
                email=data.pop('email'),
                address=data.pop('address')
            )

            product = Product.objects.get(id=data['product'])
            quantity = int(data['quantity'])

            # Check inventory and update
            if product.available_quantity >= quantity:
                product.available_quantity -= quantity
                product.save()
                status_auto = 'processing'
            else:
                status_auto = 'pending'

            order = Order.objects.create(
                customer=customer,
                product=product,
                quantity=quantity,
                status=status_auto
            )
            serializer = self.get_serializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsSuperAdminOrManagerOrEmployee])
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')

        # Validate status
        valid_statuses = dict(Order._meta.get_field('status').choices).keys()
        if new_status not in valid_statuses:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = new_status
        order.save()
        return Response({'detail': f'Status updated to {new_status}'}, status=status.HTTP_200_OK)
