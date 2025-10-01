from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer

def index(request):
    return HttpResponse("Hello, world. You're at the minishop_backend_project_settings index.")
def product_detail(request, product_id):
    return HttpResponse("You're looking at product %s." % product_id)

class ProductListCreateAPIView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 15  
        products = Product.objects.all()
        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileAPIView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            auth_header = request.META.get('HTTP_AUTHORIZATION', None)
            if auth_header and auth_header.startswith('Bearer '):
                import jwt
                token = auth_header.split(' ')[1]
                try:
                    claims = jwt.decode(token, options={"verify_signature": False, "verify_aud": False})
                    updated = False
                    if 'email' in claims and user.email != claims['email']:
                        user.email = claims['email']
                        updated = True
                    if 'given_name' in claims and user.first_name != claims['given_name']:
                        user.first_name = claims['given_name']
                        updated = True
                    if 'family_name' in claims and user.last_name != claims['family_name']:
                        user.last_name = claims['family_name']
                        updated = True
                    if updated:
                        user.save()
                except Exception:
                    pass
            data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)