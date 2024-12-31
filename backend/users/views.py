from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import get_user_model
from .serializers import UserCreateSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers


User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """
    Endpoint para criar um usuário.
    """
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        # Criar o usuário e hash da senha
        user = serializer.save()
        user.set_password(request.data.get('password'))  # Hash da senha
        user.save()  # Salvar o usuário com a senha hashada
        print(f"Usuário criado: {user.email}")
        return Response({"id": user.id}, status=status.HTTP_201_CREATED)
    else:
        print(f"Erros no formulário: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(ModelViewSet):
    """
    ViewSet para listar, criar, atualizar e deletar usuários.
    Permissão ajustada para permitir o cadastro sem autenticação.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Log dos valores recebidos
        print(f"Dados recebidos para autenticação: {attrs}")

        if not email or not password:
            print("Erro: Email ou senha ausentes.")
            raise serializers.ValidationError({"detail": "Email e senha são obrigatórios."})

        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                print("Erro: Credenciais inválidas.")
                raise serializers.ValidationError({"detail": "Credenciais inválidas."})
        except User.DoesNotExist:
            print("Erro: Usuário não encontrado.")
            raise serializers.ValidationError({"detail": "Usuário não encontrado."})

        # Se passou, retorna o token
        data = super().validate(attrs)
        data['user'] = UserSerializer(user).data
        print(f"Autenticação bem-sucedida: {data}")
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Endpoint para login via JWT, usando email como username_field.
    """
    serializer_class = MyTokenObtainPairSerializer
