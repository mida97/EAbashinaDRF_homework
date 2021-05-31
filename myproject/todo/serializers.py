from datetime import datetime

from rest_framework.serializers import HyperlinkedModelSerializer
from .models import ToDo


class ToDoModelSerializer(HyperlinkedModelSerializer):
   class Meta:
       model = ToDo
       fields = '__all__'
       read_only_fields = ['create_date', 'change_date', 'fact_date']
