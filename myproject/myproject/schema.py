import graphene
from graphene_django import DjangoObjectType

from projects.models import Project
from todo.models import ToDo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoUpdateMutation(graphene.Mutation):
    class Arguments:
        todo_id = graphene.ID()
        description = graphene.String()


    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, description, todo_id):
        todo = ToDo.objects.get(todo_id=todo_id)
        todo.description = description
        todo.save()
        return ToDoUpdateMutation(todo)


class ToDoCreateMutation(graphene.Mutation):
    class Arguments:
        project_id = graphene.Int()
        description = graphene.String()
        assigned_to = graphene.String()
        plan_date = graphene.Date()

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, project_id, description, assigned_to, plan_date):
        project = Project.objects.get(project_id=project_id)
        user = User.objects.get(username=assigned_to)
        todo = ToDo(project=project, description=description, assigned_to=user, plan_date=plan_date, is_done=False)
        todo.save()
        return ToDoCreateMutation(todo)


class Mutation(graphene.ObjectType):
    update_todo = ToDoUpdateMutation.Field()
    create_todo = ToDoCreateMutation.Field()


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(ToDoType)
    project_by_id = graphene.Field(ProjectType, project_id=graphene.Int(required=True))
    todo_by_id = graphene.Field(ProjectType, todo_id=graphene.Int(required=True))
    todo_by_email = graphene.List(ToDoType, email=graphene.String(required=True),
                                          project_id=graphene.Int(),
                                          is_done=graphene.Boolean())

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_project_by_id(root, info, project_id):
        return Project.objects.get(project_id=project_id)

    def resolve_todo_by_id(root, info, todo_id):
        return Project.objects.get(todo_id=todo_id)

    def resolve_todo_by_email(root, info, email, project_id=None, is_done=None):
        user = User.objects.get(email=email)
        todo = ToDo.objects.all().filter(assigned_to=user.id)
        if project_id:
            todo = todo.filter(project_id=project_id)
        if is_done == True or is_done == False:
            todo = todo.filter(is_done=is_done)

        return todo


schema = graphene.Schema(query=Query, mutation=Mutation)
