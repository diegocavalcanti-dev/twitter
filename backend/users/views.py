from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import User
from .serializers import UserCreateSerializer, UserSerializer

# Import para JWT customizado
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """
    Endpoint /api/users/signup/ para criar um usuário 
    sem precisar estar autenticado.
    """
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"id": user.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(ModelViewSet):
    """
    ViewSet para listar, criar, atualizar, deletar usuários.
    Por padrão, definimos IsAuthenticated, 
    mas você pode ajustar para IsAdminUser, IsAuthenticatedOrReadOnly, etc.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


# Custom Serializer para aceitar "email" no lugar de "username"
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Se vier "email" no JSON, renomei para "username"
        email = attrs.get("email")
        if email:
            attrs["username"] = email
        return super().validate(attrs)


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Endpoint para login via JWT, usando email como username_field.
    """
    serializer_class = MyTokenObtainPairSerializer
