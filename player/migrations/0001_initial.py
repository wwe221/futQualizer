# Generated by Django 4.0.6 on 2022-07-15 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('club', models.CharField(max_length=50)),
                ('nation', models.CharField(max_length=20)),
                ('league', models.CharField(max_length=20)),
                ('rating', models.IntegerField()),
                ('position', models.CharField(max_length=5)),
                ('version', models.CharField(max_length=30)),
                ('priceNow', models.CharField(max_length=20)),
                ('skill_move', models.IntegerField()),
                ('weak_foot', models.IntegerField()),
                ('work_rate', models.CharField(max_length=5)),
                ('pace', models.IntegerField()),
                ('shoot', models.IntegerField()),
                ('passing', models.IntegerField()),
                ('dribble', models.IntegerField()),
                ('defence', models.IntegerField()),
                ('phyical', models.IntegerField()),
            ],
        ),
    ]
