from django.db import models
from django.utils import timezone
from inventory.models import RawMaterial, Supplier


class Warehouse(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class PurchaseOrder(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    raw_material = models.ForeignKey(RawMaterial, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateField(default=timezone.now)
    expected_delivery_date = models.DateField()
    received = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ], default='pending')

    def __str__(self):
        return f"PO#{self.id} - {self.raw_material.name}"


class Shipment(models.Model):
    purchase_order = models.OneToOneField(PurchaseOrder, on_delete=models.CASCADE)
    tracking_number = models.CharField(max_length=100)
    carrier = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=[
        ('initiated', 'Initiated'),
        ('in_transit', 'In Transit'),
        ('delivered', 'Delivered')
    ], default='initiated')
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Shipment for PO#{self.purchase_order.id}"
