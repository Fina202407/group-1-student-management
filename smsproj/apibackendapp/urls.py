from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

# Create a router for the viewsets
router = DefaultRouter()

# Registering viewsets with the router
#router.register('students', views.StudentViewSet)
router.register('students', views.StudentViewSet)
#router.register('departments', views.DepartmentViewSet)
router.register(r'departments', views.DepartmentViewSet, basename='department')
router.register('marks', views.MarksViewSet)
router.register('admissions', views.AdmissionViewSet)
router.register('userdetails', views.UserDetailsViewSet)


urlpatterns = [
    path('signup/', views.SignupAPIView.as_view(), name="user-signup"),
    path('login/', views.LoginAPIView.as_view(), name="user-login"),
    path('logout/', views.LogoutView.as_view(), name='user-logout'),
    
]

urlpatterns += router.urls
