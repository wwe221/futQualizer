from django.db import models

# Create your models here.
class Player(models.Model):
    name = models.CharField(max_length=50)
    club = models.CharField(max_length=50)
    nation = models.CharField(max_length=20)
    league = models.CharField(max_length=20)
    rating = models.CharField(max_length=20)
    position = models.CharField(max_length=5)
    version = models.CharField(max_length=30)
    priceNow = models.CharField(max_length=20)
    skill_move = models.CharField(max_length=20)
    weak_foot = models.CharField(max_length=20)
    work_rate = models.CharField(max_length=5)    
    pace  = models.CharField(max_length=20)
    shoot = models.CharField(max_length=20)
    passing = models.CharField(max_length=20)
    dribble = models.CharField(max_length=20)
    defence = models.CharField(max_length=20)
    phyical = models.CharField(max_length=20)