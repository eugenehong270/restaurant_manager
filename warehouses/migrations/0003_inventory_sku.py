# Generated by Django 4.0.3 on 2023-05-02 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warehouses', '0002_inventory'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventory',
            name='sku',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
