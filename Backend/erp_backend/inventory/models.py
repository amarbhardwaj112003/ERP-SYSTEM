from django.db import models
from django.utils import timezone

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    address = models.TextField()

    def __str__(self):
        return self.name

class Inventory(models.Model):
    INVENTORY_TYPE = (
        ('raw', 'Raw Material'),
        ('finished', 'Finished Product'),
    )
    name = models.CharField(max_length=255)
    inventory_type = models.CharField(max_length=20, choices=INVENTORY_TYPE)
    quantity = models.PositiveIntegerField()
    unit = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.inventory_type})"


class RawMaterial(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    unit = models.CharField(max_length=50)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    purchase_date = models.DateField(default=timezone.now)
    reorder_level = models.PositiveIntegerField(default=10)  # alert if below

    def is_low_stock(self):
        return self.quantity < self.reorder_level

    def __str__(self):
        return self.name


class FinishedProduct(models.Model):
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class InventoryAudit(models.Model):
    ACTIONS = [('in', 'Stock In'), ('out', 'Stock Out')]
    product_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    action = models.CharField(max_length=10, choices=ACTIONS)
    timestamp = models.DateTimeField(auto_now_add=True)
    performed_by = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.product_name} - {self.action} - {self.quantity}"
