from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from users.models import User


class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="TestUser",
            email="testuser@example.com",
            password="password123"
        )
        response = self.client.post('/api/token/', {
            "username": "TestUser",
            "password": "password123"
        })
        self.token = response.json().get("access")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {
            "username": "NewUser",
            "email": "newuser@example.com",
            "password": "newpassword123",
        }
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
