from rest_framework import serializers
from .models import Product
# The serializer is almost a translation layer between the Django DB and the React SPA, and vice versa.
# This serializer converts Python model instances in this Django app into JSON for consumption by the React SPA, and vice versa.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'