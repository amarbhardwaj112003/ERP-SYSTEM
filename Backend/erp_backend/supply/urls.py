from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import WarehouseViewSet, PurchaseOrderViewSet, ShipmentViewSet

router = DefaultRouter()
router.register('warehouses', WarehouseViewSet)
router.register('purchase-orders', PurchaseOrderViewSet)
router.register('shipments', ShipmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
