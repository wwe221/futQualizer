from django.shortcuts import render, HttpResponse
from .models import Squad, Formation, Position
from player.models import Player
from account.models import User
import json
# Create your views here.
def index(request):
    print(Formation.choices)
    player1 = Player.objects.get(id=24626)
    player2 = Player.objects.get(id=25960)
    player3 = Player.objects.get(id=25939)
    players_in_squad = [
        {'position':Position.CAM,'playerId':player1.id},
        {'position':Position.CB,'playerId':player2.id},
        {'position':Position.ST,'playerId':player3.id},
    ]
    squad = Squad()
    squad.name = 'Test'
    squad.own_user = User.objects.get(username=request.user.username)
    squad.formation = Formation.F41212
    squad.players = players_in_squad
    squad.save()
    context = {
        squad:squad
    }
    return HttpResponse(json.dumps(context),status=200,content_type='application/json')

def myteam(request):
    if request.user.is_authenticated:
        user = request.user
        playerList = user.team.order_by('rating')
        squadList = Squad.objects.filter(own_user_id=user.id)        
        context = {
            'player_list':playerList,
            'squad_list':squadList
        }
        return render(request,'player/myteam.html',context )