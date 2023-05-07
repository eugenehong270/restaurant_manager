from rest_framework import generics
from .models import Warehouse, Inventory, Restaurant
from .serializers import WarehouseSerializer, InventorySerializer, RestaurantSerializer

# WAREHOUSES
class WarehouseListCreateView(generics.ListCreateAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

class WarehouseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer


# RESTAURANTS
class RestaurantListCreateView(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class RestaurantRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


# INVENTORY
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



#SQL###########################################################################################################

from django.db import connection
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Warehouse, Inventory, Restaurant

# WAREHOUSES
@api_view(['GET', 'POST'])
def warehouse_list_create(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM warehouses_warehouse")
            results = cursor.fetchall()

        warehouses = []
        for row in results:
            warehouse = {
                'id': row[0],
                'name': row[1],
                'x_coordinate': row[2],
                'y_coordinate': row[3],
            }
            warehouses.append(warehouse)

        return JsonResponse({'warehouses': warehouses})

    elif request.method == 'POST':
        name = request.data.get('name')
        x_coordinate = request.data.get('x_coordinate')
        y_coordinate = request.data.get('y_coordinate')

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO warehouses_warehouse (name, x_coordinate, y_coordinate) VALUES (%s, %s, %s)", (name, x_coordinate, y_coordinate))

        return JsonResponse({'message': 'Warehouse created successfully'}, status=status.HTTP_201_CREATED)

# RESTAURANTS
@api_view(['GET', 'POST'])
def restaurant_list_create(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM warehouses_restaurant")
            results = cursor.fetchall()

        restaurants = []
        for row in results:
            restaurant = {
                'id': row[0],
                'name': row[1],
                'x_coordinate': row[2],
                'y_coordinate': row[3],
            }
            restaurants.append(restaurant)

        return JsonResponse({'restaurants': restaurants})

    elif request.method == 'POST':
        name = request.data.get('name')
        x_coordinate = request.data.get('x_coordinate')
        y_coordinate = request.data.get('y_coordinate')

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO warehouses_restaurant (name, x_coordinate, y_coordinate) VALUES (%s, %s, %s)", (name, x_coordinate, y_coordinate))

        return JsonResponse({'message': 'Restaurant created successfully'}, status=status.HTTP_201_CREATED)

# INVENTORY
@api_view(['GET', 'POST'])
def inventory_list_create(request):
    warehouse_id = request.query_params.get('warehouse', None)

    if request.method == 'GET':
        query = "SELECT * FROM warehouses_inventory"
        params = []

        if warehouse_id is not None:
            query += " WHERE warehouse_id = %s"
            params.append(warehouse_id)

        with connection.cursor() as cursor:
            cursor.execute(query, params)
            results = cursor.fetchall()

        inventories = []
        for row in results:
            inventory = {
                'id': row[0],
                'warehouse_id': row[1],
                'item_name': row[2],
                'quantity': row[3],
                'sku': row[4],
            }
            inventories.append(inventory)

        return JsonResponse({'inventories': inventories})

    elif request.method == 'POST':
        warehouse_id = request.data.get('warehouse_id')
        item_name = request.data.get('item_name')
        quantity = request.data.get('quantity')
        sku = request.data.get('sku')

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO warehouses_inventory (warehouse_id, item_name, quantity, sku) VALUES (%s, %s, %s, %s)", (warehouse_id, item_name, quantity, sku))

        return JsonResponse({'message': 'Inventory item created successfully'}, status=status.HTTP_201_CREATED)
