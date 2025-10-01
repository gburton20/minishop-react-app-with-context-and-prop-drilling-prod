import datetime

from django.db import models
from django.utils import timezone

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    def __str__(self):
        return self.name
    def was_added_recently(self):
        return self.created_at >= timezone.now() - datetime.timedelta(days=1)