from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
   class Meta:
       ordering = ['-id']
       model = User
       fields = ['username',
                 'email',
                 'first_name',
                 'last_name',
                 ]
