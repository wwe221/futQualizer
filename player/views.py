import requests, time, json
from django.http import JsonResponse
from django.shortcuts import render

from account.models import User
from .models import Player 
from bs4 import BeautifulSoup
from django.shortcuts import HttpResponse
# Create your views here.

ClassList = {
    "img":"player_img",    
    "name":"player_name_players_table",
    "club_nation":"players_club_nation",
    "rating":"rating"
}
Attribute = {
    "title":"data-original-title"
}
URL_BASE = "https://www.futbin.com/players?page="
headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'}
def parse_futbin_page(pageNumb):
    url = URL_BASE + str(pageNumb)
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, "html.parser")
    playerTable = soup.select("#repTb>tbody>tr")
    playerList = []
    for player in playerTable:
        # info start
        cells = player.select('td')
        profile_section = cells[0]
        img = profile_section.select_one('div .' + ClassList['img'])['data-original']
        name = profile_section.select_one('div .' + ClassList['name']).text
        id = profile_section.select_one('div .' + ClassList['name'])["data-site-id"]
        club_nation = profile_section.select('.' + ClassList['club_nation'] +' a')
        club = club_nation[0].attrs.get(Attribute['title'])
        nation = club_nation[1].attrs.get(Attribute['title'])
        league = club_nation[2].attrs.get(Attribute['title'])
        # info end
        # start feature
        rating = cells[1].select_one("."+ClassList['rating']).text
        position = cells[2].text
        version = cells[3].text
        priceNow = cells[4].select_one('span').text
        skill_move = cells[5].text
        weak_foot = cells[6].text
        work_rate = cells[7].select('span')[0].text + '/' +  cells[7].select('span')[1].text
        # end feature
        # stat start
        pace = cells[8].select_one('span').text
        shoot = cells[9].select_one('span').text
        passing = cells[10].select_one('span').text
        dribble = cells[11].select_one('span').text
        defence = cells[12].select_one('span').text
        phyical = cells[13].select_one('span').text    
        # stat end
        if Player.objects.filter(name=name, version=version).count() > 0: # 이미 존재하는 카드면 추가 x
            return
        thisPlayer = Player()
        thisPlayer.id = id
        thisPlayer.img = img
        thisPlayer.name = name
        thisPlayer.club = club
        thisPlayer.nation = nation
        thisPlayer.league = league
        thisPlayer.rating = rating
        thisPlayer.position = position
        thisPlayer.version = version
        thisPlayer.priceNow = priceNow
        thisPlayer.skill_move = skill_move
        thisPlayer.weak_foot = weak_foot
        thisPlayer.work_rate = work_rate
        thisPlayer.pace = pace
        thisPlayer.shoot = shoot
        thisPlayer.passing = passing
        thisPlayer.dribble = dribble
        thisPlayer.defence = defence
        thisPlayer.phyical = phyical
        thisPlayer.save()
        playerList.append(thisPlayer)
        print(thisPlayer.name + " saved")
    return playerList
        
def crawling(request):
    start = int(request.GET.get('start'))
    end = int(request.GET.get('end'))
    added_players = []
    for i in range(start,end):        
        added_players.append(parse_futbin_page(i))
        time.sleep(2)
    return HttpResponse(added_players, content_type="text/json-comment-filtered")

def index(request):
    playerList = Player.objects.order_by('rating')
    context = {'player_list':playerList}
    return render(request,'player/player_list.html',context )

def detail(request, player_id):
    player = Player.objects.get(id=player_id)
    context = {
        'player' : player
    }
    return render(request, 'player/detail.html', context)

def add_to_myteam(request):    
    if request.user.is_authenticated and request.method =="POST":
        id = request.POST['playerId']
        user = request.user
        player = Player.objects.get(id=id)
        user = User.objects.get(username=user.username)        
        if user in player.team_user.all():
            user.team.remove(player)
        else:
            user.team.add(player)        
        context={
        }
    return HttpResponse(json.dumps(context),status=200,content_type='application/json')

