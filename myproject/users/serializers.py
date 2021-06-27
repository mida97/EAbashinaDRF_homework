from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializerV1(HyperlinkedModelSerializer):
   class Meta:
       ordering = ['-id']
       model = User
       fields = ['id',
                 'username',
                 'email',
                 'first_name',
                 'last_name',
                 ]

class UserModelSerializerV2(HyperlinkedModelSerializer):
   class Meta:
       ordering = ['-id']
       model = User
       fields = ['id',
                 'username',
                 'email',
                 'first_name',
                 'last_name',
                 'is_superuser',
                 'is_staff',
                 ]
