from django.urls import path
from . import views

app_name= 'squad'
urlpatterns = [
    path('', views.index),    
    path('myteam', views.myteam, name='myteam'),
]