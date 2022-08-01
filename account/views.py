from django.http import JsonResponse
from django.shortcuts import render


def index(request):
    return render(request, 'index.html',{})

def get_logged_user_by_token(request):
    if request.user.is_authenticated: 
        user = request.user
        result = {
            'username':user.username,            
            'user_team':list(user.team.values())
        }       
        return JsonResponse(result)
    return JsonResponse({})
    