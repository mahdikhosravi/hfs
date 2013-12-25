from django.shortcuts import render

# Create your views here.

def viewMainPage(request):
    a = 10
    return render(request, 'mainPage.html', {'link1': ''})