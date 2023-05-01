from django.db import models

class Warehouse(models.Model):
    name = models.CharField(max_length=255)
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()

    def __str__(self):
        return self.name
