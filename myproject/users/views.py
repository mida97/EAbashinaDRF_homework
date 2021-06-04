from rest_framework.mixins import *
from rest_framework.viewsets import *
from .models import User
from .serializers import UserModelSerializer
from rest_framework.permissions import DjangoModelPermissions


class UserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [DjangoModelPermissions]
