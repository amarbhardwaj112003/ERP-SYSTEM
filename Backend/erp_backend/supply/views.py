from rest_framework import viewsets, permissions
from .models import Warehouse, PurchaseOrder, Shipment
from .serializers import WarehouseSerializer, PurchaseOrderSerializer, ShipmentSerializer
from accounts.permissions import IsSuperAdmin, IsManagerOrEmployee, IsHRManager


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsHRManager | IsManagerOrEmployee]


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.select_related('supplier', 'raw_material')
    serializer_class = PurchaseOrderSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsHRManager | IsManagerOrEmployee]


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.select_related('purchase_order')
    serializer_class = ShipmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsManagerOrEmployee]
