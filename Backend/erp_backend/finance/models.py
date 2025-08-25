from django.db import models
from django.utils import timezone

class Account(models.Model):
    name = models.CharField(max_length=100, default="Main Account")
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="INR")  # multi-currency support

    def __str__(self):
        return f"{self.name} ({self.currency})"


class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('income', 'Income'),
        ('expense', 'Expense'),
    )
    source_module = models.CharField(max_length=50)  # HRM, Inventory, Order, Supply
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.TextField()
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.transaction_type.upper()} - ₹{self.amount} - {self.source_module}"


class Invoice(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('overdue', 'Overdue')
    )
    issued_to = models.CharField(max_length=255)
    issued_by = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    tax_percent = models.DecimalField(max_digits=5, decimal_places=2, default=18.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    issued_date = models.DateField(default=timezone.now)
    due_date = models.DateField()

    def tax_amount(self):
        return (self.tax_percent / 100) * self.amount

    def total_with_tax(self):
        return self.amount + self.tax_amount()

    def __str__(self):
        return f"Invoice #{self.id} - ₹{self.amount} - {self.status}"


class AuditLog(models.Model):
    action = models.TextField()
    performed_by = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
