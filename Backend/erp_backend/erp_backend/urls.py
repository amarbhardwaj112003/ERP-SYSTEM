from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),     # Auth module
    path('api/hrm/', include('hrm.urls')),           # HRM module
    path('api/orders/', include('orders.urls')),     # Orders module
    path('api/inventory/', include('inventory.urls')), # Inventory 
    path('api/supply/', include('supply.urls')),      # Supply module
    path('api/finance/', include('finance.urls')),    # Finance module
    path('api/crm/', include('crm.urls')),      # CRM modul
    path('api/core/', include('core.urls')),    # Core module for health checks


]