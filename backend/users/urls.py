from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from rest_framework import routers
from .views import UserViewSet

# router = DefaultRouter()
router = routers.SimpleRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
