from rest_framework.mixins import *
from rest_framework.viewsets import *
from .models import User
from .serializers import UserModelSerializer


class UserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer