from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, RawMaterialViewSet, FinishedProductViewSet, InventoryAuditViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('suppliers', SupplierViewSet)
router.register('raw-materials', RawMaterialViewSet)
router.register('finished-products', FinishedProductViewSet)
router.register('audit', InventoryAuditViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, RawMaterialViewSet, FinishedProductViewSet, InventoryAuditViewSet
from django.urls import path, include

router = DefaultRouter()
router.register('suppliers', SupplierViewSet)
router.register('raw-materials', RawMaterialViewSet)
router.register('finished-products', FinishedProductViewSet)
router.register('audit', InventoryAuditViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
