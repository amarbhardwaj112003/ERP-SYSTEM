from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccountViewSet, TransactionViewSet, InvoiceViewSet, AuditLogViewSet

router = DefaultRouter()
router.register('accounts', AccountViewSet)
router.register('transactions', TransactionViewSet)
router.register('invoices', InvoiceViewSet)
router.register('audit-logs', AuditLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
