from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from tweets.models import Tweet
from users.models import User


class TweetAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="testuser@example.com",
            password="password123"
        )
        # Login usando email e password
        response = self.client.post('/api/token/', {
            "email": "testuser@example.com",
            "password": "password123"
        })
        self.token = response.json().get("access")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        self.tweet = Tweet.objects.create(
            author="testuser@example.com",
            content="This is a test tweet",
        )

    def test_get_tweets(self):
        response = self.client.get('/api/tweets/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_tweet(self):
        data = {"author": "testuser@example.com", "content": "Another test tweet"}
        response = self.client.post('/api/tweets/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
