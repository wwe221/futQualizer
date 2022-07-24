from .models import Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id','img','name','club','nation','league','rating','position','version','priceNow','skill_move','weak_foot','work_rate','pace','shoot','passing','dribble','defence','phyical')