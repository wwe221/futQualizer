from djongo import models
from django import forms
from account.models import User
from player.models import Player
# Create your models here.

class Position(models.Choices):
    GK = "GK"
    LB = "LB"
    LWB = "LWB"
    LM = "LM"
    LW = "LW"
    CB = "CB"
    RB = "RB"
    RWB = "RWB"
    RM = "RM"
    RW = "RW"
    CDM = "CDM"
    CM = "CM"
    CAM = "CAM"
    CF = "CF"
    ST = "ST"   

class Formation(models.TextChoices):
    F442 = "4-4-2"
    F433 = "4-3-3"
    F41212 = "4-1-2-1-2"
    F352 = "3-5-2"

class player_in_sqaud(models.Model):
    position = models.CharField(choices=Position.choices, default=Position.ST, max_length=5,null=False)
    playerId = models.PositiveIntegerField(null=False,default=0)    
    class Meta:
        abstract = True

class AuthorForm(forms.ModelForm):
    class Meta:
        model = player_in_sqaud
        fields = (
            'position', 'playerId'
        )

class Squad(models.Model):
    name = models.CharField(max_length=20,default='My Squad')
    own_user = models.ForeignKey(User, on_delete=models.CASCADE)
    formation = models.CharField(choices=Formation.choices, default=Formation.F442,max_length=20)
    players = models.ArrayField(
        model_container=player_in_sqaud,
        model_form_class=AuthorForm,
        default=list()
    )
    objects = models.DjongoManager()