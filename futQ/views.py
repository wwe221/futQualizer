from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, Wellcome to futQ .")