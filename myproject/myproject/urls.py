from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.authtoken import views
from users.views import UserViewSet
from projects.views import ProjectModelViewSet
from todo.views import ToDoModelViewSet



router = DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)


urlpatterns = [
   path('admin/', admin.site.urls),
   path('api-auth/', include('rest_framework.urls')),
   path('api/', include(router.urls)),
   path('api-token-auth/', views.obtain_auth_token),
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
