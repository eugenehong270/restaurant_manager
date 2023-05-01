from rest_framework import generics
from .models import Warehouse, Inventory
from .serializers import WarehouseSerializer, InventorySerializer

class WarehouseListCreateView(generics.ListCreateAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

class WarehouseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer


class InventoryListCreateView(generics.ListCreateAPIView):
    serializer_class = InventorySerializer

    def get_queryset(self):
        warehouse_id = self.request.query_params.get('warehouse', None)
        if warehouse_id is not None:
            return Inventory.objects.filter(warehouse__id=warehouse_id)
        return Inventory.objects.all()

class InventoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
