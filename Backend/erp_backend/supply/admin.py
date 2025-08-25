from django.contrib import admin
from .models import Warehouse, PurchaseOrder, Shipment

admin.site.register(Warehouse)
admin.site.register(PurchaseOrder)
admin.site.register(Shipment)
