from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsSuperAdmin, IsHRManager, IsManagerOrEmployee
from .models import Supplier, RawMaterial, FinishedProduct, InventoryAudit
from .serializers import (
    SupplierSerializer,
    RawMaterialSerializer,
    FinishedProductSerializer,
    InventoryAuditSerializer
)

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin | IsHRManager]


class RawMaterialViewSet(viewsets.ModelViewSet):
    queryset = RawMaterial.objects.all()
    serializer_class = RawMaterialSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin | IsHRManager | IsManagerOrEmployee]


class FinishedProductViewSet(viewsets.ModelViewSet):
    queryset = FinishedProduct.objects.all()
    serializer_class = FinishedProductSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin | IsHRManager | IsManagerOrEmployee]


class InventoryAuditViewSet(viewsets.ModelViewSet):
    queryset = InventoryAudit.objects.all()
    serializer_class = InventoryAuditSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]
