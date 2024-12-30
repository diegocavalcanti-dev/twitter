from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserViewSet, signup, MyTokenObtainPairView

router = routers.SimpleRouter()
router.register('', UserViewSet, basename='user')  # /api/users/ -> UserViewSet

urlpatterns = [
    path('signup/', signup, name='signup'),  # /api/users/signup/
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
