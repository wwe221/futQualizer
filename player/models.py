from djongo import models


def auto_str(cls):
    def __str__(self):
        return '%s(%s)' % (
            type(self).__name__,
            ', '.join('%s=%s' % item for item in vars(self).items())
        )
    cls.__str__ = __str__
    return cls
@auto_str

class Player(models.Model):
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