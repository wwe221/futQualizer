from djongo import models
from django import forms

class Player(models.Model):
    id = models.PositiveIntegerField(primary_key=True, unique=True)
    img = models.CharField(max_length=150)
    name = models.CharField(max_length=50)
    club = models.CharField(max_length=50)
    nation = models.CharField(max_length=20)
    league = models.CharField(max_length=20)
    rating = models.IntegerField()
    position = models.CharField(max_length=5)
    version = models.CharField(max_length=30)
    priceNow = models.CharField(max_length=20)
    skill_move = models.IntegerField()
    weak_foot = models.IntegerField()
    work_rate = models.CharField(max_length=5)    
    pace  = models.IntegerField()
    shoot = models.IntegerField()
    passing = models.IntegerField()
    dribble = models.IntegerField()
    defence = models.IntegerField()
    phyical = models.IntegerField()
    
    def __str__(self):
        return self.name