# Generated by Django 3.2.2 on 2021-05-20 19:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('todo_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(max_length=255, verbose_name='Description')),
                ('create_date', models.DateField()),
                ('plan_date', models.DateField()),
                ('change_date', models.DateField()),
                ('complete_date', models.DateField()),
                ('is_done', models.BooleanField()),
                ('assigned_to', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='assigned_to_todo', to=settings.AUTH_USER_MODEL, verbose_name='Assigned To')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='created_todo', to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='included_todo', to='projects.project')),
            ],
        ),
    ]
