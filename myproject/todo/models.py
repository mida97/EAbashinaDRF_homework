from django.db import models
from projects.models import Project
from users.models import User
from datetime import datetime


class ToDo (models.Model):
    todo_id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, related_name='included_todo', on_delete=models.PROTECT)
    assigned_to = models.ForeignKey(User, verbose_name='Assigned To', related_name='assigned_to_todo',
                                    on_delete=models.PROTECT)
    description = models.CharField(max_length=255, verbose_name='Description')
    created_by = models.ForeignKey(User, verbose_name='Created By', related_name='created_todo',
                                   on_delete=models.PROTECT, null=True)
    create_date = models.DateTimeField(blank=True)
    plan_date = models.DateField()
    change_date = models.DateTimeField(blank=True)
    fact_date = models.DateTimeField(default=None, blank=True, null=True)
    is_done = models.BooleanField()


    def todo_complete(self):
        self.fact_date = datetime.now()
        self.change_date = datetime.now()
        self.is_done = True
        self.save()


    def save(self, *args, **kwargs):
        if not self.create_date:
            self.create_date = datetime.now()
        self.change_date = datetime.now()
        super().save(*args, **kwargs)
