import datetime

from django.db import models
from django.utils import timezone

# Create your models here.
# Product model
class Product(models.Model):
    # Django automatically adds an ID field to each model
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # The user field associates products added to the app, i.e. those for sale, with their creator:
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    # String method to more helpfully represent objects added via the free API provided by Django in Shell in the Terminal (ref: https://docs.djangoproject.com/en/5.2/intro/tutorial02/):
    def __str__(self):
        return self.name
    # A method to demonstrate how recently the product was added to the DB (ref: https://docs.djangoproject.com/en/5.2/intro/tutorial02/):
    def was_added_recently(self):
        return self.created_at >= timezone.now() - datetime.timedelta(days=1)