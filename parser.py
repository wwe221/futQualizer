from re import L
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

def auto_str(cls):
    def __str__(self):
        return '%s(%s)' % (
            type(self).__name__,
            ', '.join('%s=%s' % item for item in vars(self).items())
        )
    cls.__str__ = __str__
    return cls
@auto_str
class Player:
    def setInfo(self, name, club, nation , league):
        self.name = name
        self.club = club
        self.nation = nation
        self.league = league        
        return self

    def setFeature(self, rating,position, version,priceNow,skill_move,weak_foot,work_rate):
        self.ration = rating
        self.position = position
        self.version = version
        self.priceNow = priceNow
        self.skill_move = skill_move
        self.weak_foot = weak_foot
        self.work_rate = work_rate
        return self
    def setStat(self, pace, shoot,passing,dribble,defence, phyical):
        self.pace = pace
        self.shoot = shoot
        self.passing = passing
        self.dribble = dribble
        self.defence = defence
        self.phyical = phyical
        return self

ClassList = {    
    "name":"player_name_players_table",
    "club_nation":"players_club_nation",
    "rating":"rating"
}
Attribute = {
    "title":"data-original-title"
}
URL_BASE = "https://www.futbin.com/players?page="
PAGE_LIMIT = 5
headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'}
playerList = []
for i in range(1,PAGE_LIMIT):
    url = URL_BASE + str(i)
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.content, "html.parser")
    playerTable = soup.select("#repTb>tbody>tr")
    for player in playerTable:
        # info start
        cells = player.select('td')
        profile_section = cells[0]
        name = profile_section.select_one('div .' + ClassList['name']).text
        club_nation = profile_section.select('.' + ClassList['club_nation'] +' a')
        club = club_nation[0].attrs.get(Attribute['title'])
        nation = club_nation[1].attrs.get(Attribute['title'])
        league = club_nation[2].attrs.get(Attribute['title'])
        # info end
        
        
        # start
        rating = cells[1].select_one("."+ClassList['rating']).text
        position = cells[2].text
        version = cells[3].text
        priceNow = cells[4].select_one('span').text
        skill_move = cells[5].text
        weak_foot = cells[6].text
        work_rate = cells[7].select('span')[0].text + '/' +  cells[7].select('span')[1].text
        # end
        
        # stat start
        pace = cells[8].select_one('span').text
        shoot = cells[9].select_one('span').text
        passing = cells[10].select_one('span').text
        dribble = cells[11].select_one('span').text
        defence = cells[12].select_one('span').text
        phyical = cells[13].select_one('span').text    
        # stat end

        thisPlayer = Player().setInfo(name=name, club=club, nation=nation, league=league)
        thisPlayer.setFeature(rating,position,version,priceNow,skill_move,weak_foot,work_rate)
        thisPlayer.setStat(pace, shoot,passing,dribble,defence, phyical)
        playerList.append(thisPlayer)
    time.sleep(4)
    

for player in playerList:
    print(player)