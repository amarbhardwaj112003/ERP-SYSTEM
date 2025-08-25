from rest_framework import viewsets, permissions
from .models import Account, Transaction, Invoice, AuditLog
from .serializers import AccountSerializer, TransactionSerializer, InvoiceSerializer, AuditLogSerializer
from accounts.permissions import IsSuperAdmin, IsFinanceRoleOrReadOnly

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsFinanceRoleOrReadOnly]


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-date')
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsFinanceRoleOrReadOnly]


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all().order_by('-issued_date')
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsFinanceRoleOrReadOnly]


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all().order_by('-timestamp')
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin]
