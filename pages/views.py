from django.shortcuts import render

# Create your views here.

def viewMainPage(request):
    cat1 = {'name': 'cat1', 'id': '0'}
    cat2 = {'name': 'cat2', 'id': '1'}
    categories = [cat1, cat2]
    return render(request, 'mainPage.html', {'categories': categories, 'title': 'MainPage'})