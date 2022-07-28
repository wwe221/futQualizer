from django.urls import path
from . import views

urlpatterns = [
    path('<int:squad_id>',views.get_squad),
    path('list', views.mylist),
    path('test', views.test),
    path('myteam', views.myteam, name='myteam'),
]
