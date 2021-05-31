from django_filters import rest_framework as filters
from .models import ToDo


class ToDoFilter(filters.FilterSet):
    #name = filters.CharFilter(lookup_expr='contains')
    project = filters.NumberFilter()
    create_date = filters.IsoDateTimeFromToRangeFilter(field_name='change_date')
    '''http://127.0.0.1:8000/api/todo/?create_date_after=2021-05-21T09:49:17&create_date_before=2021-05-21T19:49:17'''

    class Meta:
        model = ToDo
        fields = ('project', 'create_date')
