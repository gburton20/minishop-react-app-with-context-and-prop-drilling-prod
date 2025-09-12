# minishop_backend_app/auth0_backend.py
import json
import requests
from jose import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from django.contrib.auth.models import AnonymousUser

AUTH0_DOMAIN = 'dev-ngpva7twomewnfum.us.auth0.com'
API_IDENTIFIER = 'https://dev-ngpva7twomewnfum.us.auth0.com/api/v2/'
ALGORITHMS = ['RS256']

class Auth0JSONWebTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION', None)
        if not auth:
            return (AnonymousUser(), None)
        parts = auth.split()
        if parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Authorization header must start with Bearer')
        token = parts[1]
        try:
            jwks = requests.get(f'https://{AUTH0_DOMAIN}/.well-known/jwks.json').json()
            unverified_header = jwt.get_unverified_header(token)
            rsa_key = {}
            for key in jwks['keys']:
                if key['kid'] == unverified_header['kid']:
                    rsa_key = {
                        'kty': key['kty'],
                        'kid': key['kid'],
                        'use': key['use'],
                        'n': key['n'],
                        'e': key['e']
                    }
            if not rsa_key:
                raise exceptions.AuthenticationFailed('Unable to find appropriate key')
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_IDENTIFIER,
                issuer=f'https://{AUTH0_DOMAIN}/'
            )
        except Exception as e:
            print(f"JWT validation error: {str(e)}")
            raise exceptions.AuthenticationFailed(f'JWT validation error: {str(e)}')
        # You can create or get a Django user here if needed
        return (AnonymousUser(), None)  # For now, returns AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from jose import jwt
import requests

from django.conf import settings

class Auth0JWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION', None)
        if not auth:
            print("No Authorization header found.")
            return None
        parts = auth.split()
        if parts[0].lower() != 'bearer':
            print("Authorization header must start with Bearer.")
            return None
        token = parts[1]
        try:
            validated_token = self.get_validated_token(token)
            print(f"JWT decoded successfully. Payload: {validated_token}")
        except Exception as e:
            print(f"JWT validation failed: {e}")
            return None
        # Accept any valid Auth0 JWT and return a Django user
        from django.contrib.auth.models import User
        sub = validated_token.get('sub')
        if not sub:
            print("No sub claim in JWT.")
            return None
        username = f"auth0_{sub}"
        user, created = User.objects.get_or_create(username=username)
        if created:
            user.set_unusable_password()
            user.save()
        print(f"Authenticated user: {user.username}")
        return (user, validated_token)
    def get_validated_token(self, raw_token):
        print("Auth0JWTAuthentication: get_validated_token called")
        print(f"Raw token: {raw_token}")
        # Fetch JWKS from Auth0
        jwks_url = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
        print(f"Fetching JWKS from: {jwks_url}")
        jwks = requests.get(jwks_url).json()
        print(f"JWKS keys: {jwks.get('keys')}")
        try:
            unverified_header = jwt.get_unverified_header(raw_token)
            print(f"Unverified JWT header: {unverified_header}")
        except Exception as e:
            print(f"Error getting unverified header: {str(e)}")
            raise
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        print(f"RSA key selected: {rsa_key}")
        if rsa_key:
            try:
                print("Attempting to decode JWT...")
                payload = jwt.decode(
                    raw_token,
                    rsa_key,
                    algorithms=[settings.SIMPLE_JWT["ALGORITHM"]],
                    audience=settings.SIMPLE_JWT["AUDIENCE"],
                    issuer=settings.SIMPLE_JWT["ISSUER"]
                )
                print(f"JWT decoded successfully. Payload: {payload}")
                return payload
            except Exception as e:
                print(f"Token validation error: {str(e)}")
                raise Exception(f"Token validation error: {str(e)}")
        print("Unable to find appropriate key for JWT validation.")
        raise Exception("Unable to find appropriate key")