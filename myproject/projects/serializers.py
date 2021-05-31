from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project


class ProjectModelSerializer(HyperlinkedModelSerializer):
   class Meta:
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