from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .filters import ToDoFilter
from .models import ToDo
from .serializers import ToDoModelSerializer
from rest_framework.permissions import DjangoModelPermissions

class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter
    permission_classes = [DjangoModelPermissions]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.todo_complete()
        return Response(status=status.HTTP_204_NO_CONTENT)
