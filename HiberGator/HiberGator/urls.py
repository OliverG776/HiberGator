"""
URL configuration for HiberGator project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import create_account, create_admin_account, login, collect_all_users, delete_user, change_user_password, update_profile, get_profile, save_sleep_data, get_sleep_data, generate_recommendation

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/create_account/', create_account, name='create_account'),
    path('api/create_admin_account/', create_admin_account, name='create_admin_account'),
    path('api/login/', login, name='login'),
    path('api/collect_all_users/', collect_all_users, name='collect_all_users'),
    path('api/delete_user/', delete_user, name='delete_user'),
    path('api/change_user_password/', change_user_password, name='change_user_password'),
    path('api/update_profile/', update_profile, name='update_profile'),
    path('api/get_profile/', get_profile, name='get_profile'),
    path('api/save_sleep_data/', save_sleep_data, name='save_sleep_data'),
    path('api/get_sleep_data/', get_sleep_data, name='get_sleep_data'),
    path('api/generate_recommendation/', generate_recommendation, name='generate_recommendation'),
]
