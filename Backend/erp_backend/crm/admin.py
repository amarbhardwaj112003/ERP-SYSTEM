from django.contrib import admin
from .models import Customer, Interaction, Lead, Campaign, SupportTicket

admin.site.register(Customer)
admin.site.register(Interaction)
admin.site.register(Lead)
admin.site.register(Campaign)
admin.site.register(SupportTicket)
