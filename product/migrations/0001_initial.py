# Generated by Django 5.0.1 on 2024-02-05 06:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='media/brand/')),
                ('description', models.TextField(blank=True, max_length=255, null=True)),
                ('is_active', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=512)),
                ('description', models.TextField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='media/category/')),
                ('is_active', models.BooleanField(default=True)),
                ('slug', models.SlugField(max_length=1024)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('description', models.TextField()),
                ('actual_price', models.DecimalField(blank=True, decimal_places=2, max_digits=13, null=True, verbose_name='Original narx')),
                ('retail_price', models.DecimalField(blank=True, decimal_places=2, max_digits=13, null=True)),
                ('discount_price', models.DecimalField(blank=True, decimal_places=2, max_digits=13, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='media/product/')),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.brand')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.category')),
            ],
        ),
    ]
