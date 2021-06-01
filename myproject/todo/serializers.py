from datetime import datetime

from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField, PrimaryKeyRelatedField

from .models import ToDo


class ToDoModelSerializer(HyperlinkedModelSerializer):
    project = PrimaryKeyRelatedField(read_only=True)
    class Meta:
       model = ToDo
       fields = ['todo_id',
                 'description',
                 'project',
                 'assigned_to',
                 'plan_date',
                 'is_done',
                 'create_date',
                 'change_date',
                 'fact_date']
       read_only_fields = ['todo_id',
                           'project',
                           'create_date',
                           'change_date',
                           'fact_date']
