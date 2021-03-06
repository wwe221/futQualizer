from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from .models import Squad, Formation, Position
from player.models import Player
from account.models import User
import json
# Create your views here.

# test, user
def test(request):
    print(Formation.choices)
    player1 = Player.objects.get(id=24626)
    player2 = Player.objects.get(id=25960)
    player3 = Player.objects.get(id=25939)
    players_in_squad = [
        {'position': Position.CAM, 'playerId': player1.id},
        {'position': Position.CB, 'playerId': player2.id},
        {'position': Position.ST, 'playerId': player3.id},
    ]
    squad = Squad()
    squad.name = 'Test'
    squad.own_user = User.objects.get(username=request.user.username)
    squad.formation = Formation.F41212
    squad.players = players_in_squad
    squad.save()
    context = {
        squad: squad
    }
    return HttpResponse(json.dumps(context), status=200, content_type='application/json')

# user 가 가지고 있는 스쿼드 리스트
def list(request):
    if request.user.is_authenticated:
        user = request.user
        squadList = Squad.objects.filter(own_user_id=user.id)
        context = {
            'squad_list': list(squadList.values())
        }
        return JsonResponse(context)

# user 의 팀 선수 리스트
def myteam(request):
    if request.user.is_authenticated:
        user = request.user
        playerList = user.team
        print(playerList)
        context = {
            'player_list': list(playerList.values()),
        }
        return JsonResponse(context)
