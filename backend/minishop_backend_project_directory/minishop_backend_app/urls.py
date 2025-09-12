from django.urls import path

from . import views

urlpatterns = [
    # A test path from the Django documentation:
    path("", views.index, name="index"),
    # A test path from the Django documentation:
    # The path (path()) function maps a specific URL structure to a view function ('views.').
    # Django expects an integer value in "<int:product_id>/", which it will capture and pass to the view as the product_id argument
    # When a user visits a URL like /1/, Django will call the product_detail view from the views. modul, passing 1 as the product_id.
    # The name="detail" assigns a name to this URL pattern, making it easier to refer to elsewhere in the Django project
    path("<int:product_id>/", views.product_detail, name="detail"),
    # API endpoint for listing and creating products:
    # Endpoint for listing and creating products.
    # as_view() turns the class-based view into a callable view function.
    # as_view() enables the view to support both GET (list products) and POST (create products) methods.
    path("products/", views.ProductListCreateAPIView.as_view(), name="product-list-create"),
    # API endpoint which is exposed to the React SPA front end for purposes of authentication
    path("api/profile/", views.ProfileAPIView.as_view(), name="get-profile-info-view")
    
]