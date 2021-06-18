from rest_framework import status
from rest_framework.test import APITestCase
from mixer.backend.django import mixer
from projects.models import Project
from todo.models import ToDo
from users.models import User


class TestTodoViewSet(APITestCase):
    def setUp(self) -> None:
        self.admin = User.objects.create_superuser('admin', 'admin@admin.com', '123456')
        self.testuser = User.objects.create_user('testuser', 'testuser@admin.com', '123456')

    def test_create_todo(self):
        test_project = mixer.blend(Project, name='pr1')
        self.client.login(username='admin', password='123456')
        response = self.client.get(f'/api/projects/{test_project.project_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo_dict = {
            'description': 'test',
            'project': test_project.project_id,
            'planDate': "2021-06-04",
            'assignedTo': self.testuser.id,
            'isDone': 0
        }
        response = self.client.post('/api/todo/', todo_dict, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # print(response.data)
        self.assertIsNotNone(response.data.get('change_date'))
        self.assertIsNotNone(response.data.get('create_date'))

    def test_delete(self):
        test_todo = mixer.blend(ToDo)
        self.client.login(username='admin', password='123456')
        response = self.client.delete(f'/api/todo/{test_todo.todo_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.client.get(f'/api/todo/{test_todo.todo_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(response.data.get('fact_date'))
        self.assertEqual(response.data.get('is_done'), True)
