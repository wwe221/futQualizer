from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from .models import Squad, Formation, Position
from player.models import Player
from account.models import User
import json
# Create your views here.

# test, user
def test(request):
    playerList = list(Player.objects.order_by('rating'))
    players_in_squad = [
    ]
    for idx in range(0,15):        
        players_in_squad.append(
            {"ordinal":idx , "playerId":playerList[idx].id}
        )
    squad = Squad()
    squad.name = 'Test'
    squad.own_user = User.objects.get(username=request.user.username)
    squad.formation = Formation.F442
    squad.players = players_in_squad
    squad.save()
    context = {
        squad: squad
    }
    return HttpResponse(json.dumps(context), status=200, content_type='application/json')

# user 가 가지고 있는 스쿼드 리스트
def mylist(request):
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
        playerList = user.team.order_by("-rating")
        context = {
            'player_list': list(playerList.values()),
        }
        return JsonResponse(context)

def get_squad(request,squad_id):
    squad = Squad.objects.get(id=squad_id)
    playerList = []
    for player in squad.players:
        playerInfo = None
        if(player.get('playerId') != 0):
            playerInfo = list(Player.objects.filter(id=player.get('playerId')).values())[0]        
            
        playerObj = {
            'ordinal': player.get("ordinal"),
            'player': playerInfo
        }
        playerList.append(playerObj)        
    data = serializers.serialize('json', [ squad,])
    struct = json.loads(data)
    data = json.dumps(struct[0])
    context = {
        'name':squad.name,
        'formation':squad.formation,
        'players': playerList
    }
    return JsonResponse(context)