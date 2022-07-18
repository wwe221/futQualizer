from djongo import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from player.models import Player, PlayerForm

class UserManager(BaseUserManager):
    def create_user(self, username, password=None):

        user = self.model(
            username=username,       
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        user = self.create_user(
            username,          
            password=password,            
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField(        
        max_length=20,
        null=False,
        unique=True,
        default=''
    )     
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    team = models.ManyToManyField(Player,related_name='team_user')

    objects = UserManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin