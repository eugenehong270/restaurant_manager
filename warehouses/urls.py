from django.urls import path
from .views import WarehouseListCreateView, WarehouseRetrieveUpdateDestroyView

urlpatterns = [
    path('warehouses/', WarehouseListCreateView.as_view(), name='warehouses_list_create'),
    path('warehouses/<int:pk>/', WarehouseRetrieveUpdateDestroyView.as_view(), name='warehouses_retrieve_update_destroy'),
]
