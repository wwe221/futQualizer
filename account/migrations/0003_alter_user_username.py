# Generated by Django 4.0.6 on 2022-07-18 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_alter_user_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(default='', max_length=20, unique=True),
        ),
    ]
