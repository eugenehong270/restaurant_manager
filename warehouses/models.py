from django.db import models

class Warehouse(models.Model):
    name = models.CharField(max_length=255)
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()

    def __str__(self):
        return self.name

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()

    def __str__(self):
        return self.name


class Inventory(models.Model):
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name='inventory')
    item_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    sku = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.item_name} ({self.quantity})"
