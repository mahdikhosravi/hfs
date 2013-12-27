from django.shortcuts import render

# Create your views here.
class Category:
    name = None
    id = None
    childs = []
    parent = None

    def __repr__(self):
        return self.name


cat1 = {'name': 'فیلم و سریال', 'id': 1}
cat2 = {'name': 'کتاب', 'id': 2}
cat3 = {'name': 'سینمایی', 'id': 3, 'parent': 1}
cat4 = {'name': 'کارتون', 'id': 4, 'parent': 1}
cat5 = {'name': 'سریال', 'id': 5, 'parent': 1}
cat6 = {'name': 'رمان', 'id': 6, 'parent': 2}
cat7 = {'name': 'تاریخی', 'id': 7, 'parent': 2}
cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7]


def viewMainPage(request):
    return render(request, 'mainPage.html', {'categories': cats, 'title': 'MainPage'})


def viewProductPage(request, cat):
    return render(request, 'productPage.html', {'categories': cats, 'title': 'ProductPage'})


def viewSearchPage(request):
    return render(request, 'productPage.html', {'categories': cats, 'title': 'SearchResultPage'})

def viewManagementPage(request):
    return render(request, 'managementPage.html', {'categories': cats, 'title': 'ManagementPage'})