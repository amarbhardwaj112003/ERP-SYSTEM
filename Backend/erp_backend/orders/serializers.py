from rest_framework import serializers
from .models import Customer, Product, Order

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'customer_name',
            'product', 'product_name', 'quantity',
            'order_date', 'delivery_date', 'status', 'payment_status'
        ]
        read_only_fields = ['order_date', 'status', 'payment_status']
