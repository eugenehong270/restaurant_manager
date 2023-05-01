# Generated by Django 4.0.3 on 2023-05-01 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('x_coordinate', models.FloatField()),
                ('y_coordinate', models.FloatField()),
            ],
        ),
    ]