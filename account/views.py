from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import UserCreationForm

def index(request):
    return HttpResponse("Hello, Wellcome to futQ .")

def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            userName = form.cleaned_data.get('userName')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(userName=userName, password=raw_password)  # 사용자 인증
            login(request, user)  # 로그인
            return redirect('index')
    else:
        form = UserCreationForm()
    return render(request, 'common/signup.html', {'form': form})