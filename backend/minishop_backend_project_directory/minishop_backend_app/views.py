from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer
# A test function from the Django documentation:
def index(request):
    return HttpResponse("Hello, world. You're at the minishop_backend_project_settings index.")
# A test function from the Django documentation:
def product_detail(request, product_id):
    return HttpResponse("You're looking at product %s." % product_id)
# The class, a blueprint for creating an object, relevant to the Minishop app. 
# The purpose of the class ProductListCreateAPIView(APIView) is to provide API endpoints for listing all products and creating new products.
# This class inherits from Django REST Framework's APIView. See https://www.django-rest-framework.org/api-guide/views/ for details.
# This class includes two HTTP method handlers, 'get' and 'post', which correspond to CRUD functionality: 'get' handles HTTP GET requests for reading data, and 'post' handles HTTP POST requests for creating data.
#   1) 'get' relates to 'R', or 'Read', in CRUD.
#   2) 'post' relates to 'C', or 'Create', in CRUD
# Only the relevant method ('get' or 'post') is executed depending on the HTTP request type.
class ProductListCreateAPIView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
    # Handles GET requests to return a list of all products in serialized format.
    # get has two arguments, 'self' - the convention for the first parameter of instance methods in a class, and 'request' - an object that represents the HTTP request sent by a client to this app's server.
    def get(self, request):
        # Pagination to handle many products per page
        paginator = PageNumberPagination()
        paginator.page_size = 15  # Set desired page size
        products = Product.objects.all()
        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    # Each time 'post' is called, a new object is created with one keys, 'serializer'. 
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        # If the serializer process has been valid, i.e. a JSON object has been successfully converted into a Django model instance, save the Django model instance. Return the serialized data, and provide a successful status message. 
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # If the serializer process hasn't worked, return the serialized data's error property and an error message.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileAPIView(APIView):
    def get(self, request):
        user = request.user
        # If the user is authenticated:
        if user.is_authenticated:
            # Sync user data from Auth0 claims if available
            auth_header = request.META.get('HTTP_AUTHORIZATION', None)
            if auth_header and auth_header.startswith('Bearer '):
                import jwt
                token = auth_header.split(' ')[1]
                try:
                    # Decode without verification just to get claims (already verified by DRF)
                    claims = jwt.decode(token, options={"verify_signature": False, "verify_aud": False})
                    # Update Django user fields if present in claims
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