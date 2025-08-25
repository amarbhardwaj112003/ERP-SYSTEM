from rest_framework import viewsets, permissions
from .models import Customer, Interaction, Lead, Campaign, SupportTicket
from .serializers import (
    CustomerSerializer, InteractionSerializer, LeadSerializer,
    CampaignSerializer, SupportTicketSerializer
)
from accounts.permissions import IsSuperAdmin, IsCRMRoleOrReadOnly


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsCRMRoleOrReadOnly]


class InteractionViewSet(viewsets.ModelViewSet):
    queryset = Interaction.objects.all().order_by('-date')
    serializer_class = InteractionSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsCRMRoleOrReadOnly]


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().order_by('-created_at')
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsCRMRoleOrReadOnly]


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all().order_by('-created_at')
    serializer_class = CampaignSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsCRMRoleOrReadOnly]


class SupportTicketViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all().order_by('-created_at')
    serializer_class = SupportTicketSerializer
    permission_classes = [permissions.IsAuthenticated, IsSuperAdmin | IsCRMRoleOrReadOnly]
