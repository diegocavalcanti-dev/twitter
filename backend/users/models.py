from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    # Removendo o campo username herdado
    username = None

    # Torna o email único e obrigatório
    email = models.EmailField(unique=True)

    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    groups = models.ManyToManyField(Group, related_name='custom_user_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True)

    # Define o email como campo principal de login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # não pede mais username

    def __str__(self):
        return self.email
