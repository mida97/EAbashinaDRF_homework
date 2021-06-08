from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from .models import Project
from .serializers import ProjectModelSerializer
from .filters import ProjectFilter
from rest_framework.permissions import DjangoModelPermissions


class CustomModelPermissions(DjangoModelPermissions):
    def has_permission(self, request, view):
        return request.user.is_staff or super().has_permission(request, view)


class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10


class ProjectModelViewSet(ModelViewSet):
   queryset = Project.objects.all()
   serializer_class = ProjectModelSerializer
   pagination_class = ProjectLimitOffsetPagination
   filterset_class = ProjectFilter
   permission_classes = [CustomModelPermissions]
