from rest_framework.mixins import *
from rest_framework.viewsets import *
from .models import User
from .serializers import UserModelSerializerV1, UserModelSerializerV2
from rest_framework.permissions import DjangoModelPermissions


class UserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializerV2
        return UserModelSerializerV1

    permission_classes = [DjangoModelPermissions]
