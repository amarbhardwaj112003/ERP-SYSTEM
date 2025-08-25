from rest_framework import serializers
from .models import Warehouse, PurchaseOrder, Shipment
from inventory.models import Supplier, RawMaterial

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = '__all__'


class PurchaseOrderSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source='supplier.name', read_only=True)
    material_name = serializers.CharField(source='raw_material.name', read_only=True)

    class Meta:
        model = PurchaseOrder
        fields = '__all__'


class ShipmentSerializer(serializers.ModelSerializer):
    po_id = serializers.IntegerField(source='purchase_order.id', read_only=True)

    class Meta:
        model = Shipment
        fields = '__all__'
