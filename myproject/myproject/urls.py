from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.authtoken import views
from users.views import UserViewSet
from projects.views import ProjectModelViewSet
from todo.views import ToDoModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='project',
        default_version='1.0',
        description='Some description'
    ),
    public=True,
    permission_classes=(AllowAny,)
)


urlpatterns = [
   path('admin/', admin.site.urls),
   path('api-auth/', include('rest_framework.urls')),
   path('api/', include(router.urls)),
   path('api-token-auth/', views.obtain_auth_token),
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

   path('api/<str:version>/users', UserViewSet.as_view({'get': 'list'})),

   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   #re_path('^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),

   path("graphql/", GraphQLView.as_view(graphiql=True)),

   path('', TemplateView.as_view(template_name='index.html')),
]
