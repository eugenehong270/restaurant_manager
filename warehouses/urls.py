from django.urls import path
from .views import WarehouseListCreateView, WarehouseRetrieveUpdateDestroyView, InventoryListCreateView, InventoryRetrieveUpdateDestroyView

urlpatterns = [
    path('warehouses/', WarehouseListCreateView.as_view(), name='warehouses_list_create'),
    path('warehouses/<int:pk>/', WarehouseRetrieveUpdateDestroyView.as_view(), name='warehouses_retrieve_update_destroy'),
    path('inventory/', InventoryListCreateView.as_view(), name='inventory_list_create'),
    path('inventory/<int:pk>/', InventoryRetrieveUpdateDestroyView.as_view(), name='inventory_retrieve_update_destroy'),
]
