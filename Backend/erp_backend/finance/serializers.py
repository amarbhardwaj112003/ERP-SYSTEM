from rest_framework import serializers
from .models import Account, Transaction, Invoice, AuditLog

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    tax_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_with_tax = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = '__all__'
