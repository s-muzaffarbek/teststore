from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=512)
    description = models.TextField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='media/category/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    slug = models.SlugField(max_length=1024)

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=128)
    logo = models.ImageField(upload_to='brand/', null=True, blank=True)
    description = models.TextField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=256)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    description = models.TextField()
    actual_price = models.DecimalField(verbose_name="Original narx", max_digits=13, decimal_places=2, null=True, blank=True)
    retail_price = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    discount_price = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='product/', null=True, blank=True)

    def __str__(self):
        return self.name



