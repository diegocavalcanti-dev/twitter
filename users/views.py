from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from rest_framework.permissions import AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action == 'create':  # Define o serializer para criação de usuários
            return UserCreateSerializer
        return UserSerializer
