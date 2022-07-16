from djongo import models

class User(models.Model):
    name = models.CharField(max_length=15)
    age = models.IntegerField()
