from datetime import datetime

from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField, PrimaryKeyRelatedField

from projects.models import Project
from .models import ToDo


class ToDoModelSerializer(HyperlinkedModelSerializer):
    project = PrimaryKeyRelatedField(read_only=False, queryset=Project.objects.all())
    class Meta:
        ordering = ['todo_id']
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
                           'create_date',
                           'change_date',
                           'fact_date']
