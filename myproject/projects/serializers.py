from rest_framework.serializers import ModelSerializer

from .models import Project


class ProjectModelSerializer(ModelSerializer):

   class Meta:
       ordering = ['project_id']
       model = Project
       fields = [
           'project_id',
           'name',
           'repo_link',
           'status',
           'change_date',
           'project_members'
       ]
       read_only_fields = ['project_id', 'change_date']