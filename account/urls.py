from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

app_name= 'account'
urlpatterns = [
    path('', include('rest_auth.urls')),
    path('register/', include('rest_auth.registration.urls'))
]