from django.urls import path , include
from . import views

urlpatterns = [
    path('', views.index,name='index'),
    path('crawling', views.crawling,name='crawling'),
    path('<int:player_id>', views.detail, name='detail'),
]
