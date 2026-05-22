from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔹 ERP Modules
    path('api/auth/', include('accounts.urls')),
    path('api/hrm/', include('hrm.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/inventory/', include('inventory.urls')),
    path('api/supply/', include('supply.urls')),
    path('api/finance/', include('finance.urls')),
    path('api/crm/', include('crm.urls')),
    path('api/core/', include('core.urls')),

    # 🔹 Swagger
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
