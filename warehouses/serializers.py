from rest_framework import serializers
from .models import Warehouse, Inventory

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['id', 'name', 'x_coordinate', 'y_coordinate']


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ['id', 'warehouse', 'item_name', 'quantity', 'sku']
