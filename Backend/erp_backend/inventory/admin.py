from django.contrib import admin
from .models import Supplier, RawMaterial, FinishedProduct, InventoryAudit

admin.site.register(Supplier)
admin.site.register(RawMaterial)
admin.site.register(FinishedProduct)
admin.site.register(InventoryAudit)
