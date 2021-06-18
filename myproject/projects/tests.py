import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from mixer.backend.django import mixer

from users.models import User
from .views import ProjectModelViewSet
from .models import Project


class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('admin', 'admin@admin.com', '123456')
        self.testuser = User.objects.create_user('testuser', 'testuser@admin.com', '123456')


    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': 'Пушкин'}, format='json')
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_get_list_admin(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_todo(self):
        client = APIClient()
        test_project = mixer.blend(Project, name='pr1')
        client.login(username='admin', password='123456')
        response = client.put(f'/api/projects/{test_project.project_id}/', {'name': 'Проект 1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        #print(response.data)
        self.assertEqual(response.data.get('name'),'Проект 1')

