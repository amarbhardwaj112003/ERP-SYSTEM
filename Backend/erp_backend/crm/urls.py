from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    CustomerViewSet, InteractionViewSet, LeadViewSet,
    CampaignViewSet, SupportTicketViewSet
)

router = DefaultRouter()
router.register('customers', CustomerViewSet)
router.register('interactions', InteractionViewSet)
router.register('leads', LeadViewSet)
router.register('campaigns', CampaignViewSet)
router.register('tickets', SupportTicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
