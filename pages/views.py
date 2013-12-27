import json
from django.http.response import HttpResponse
from django.shortcuts import render

# Create your views here.
from sale.models import Product, Category

cat1 = {'name': 'فیلم و سریال', 'id': 1}
cat2 = {'name': 'کتاب', 'id': 2}
cat3 = {'name': 'سینمایی', 'id': 3, 'parent': 1}
cat4 = {'name': 'کارتون', 'id': 4, 'parent': 1}
cat5 = {'name': 'سریال', 'id': 5, 'parent': 1}
cat6 = {'name': 'رمان', 'id': 6, 'parent': 2}
cat7 = {'name': 'تاریخی', 'id': 7, 'parent': 2}
# cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7]

pro0 = {'name': 'پورن', 'price': '۱۰۰۰', 'imgurl': 'ede nadaram', 'url': 'ede nadaram 2'};
pro1 = {'name': 'پورن', 'price': '۲۰۰۰', 'imgurl': 'ede nadaram', 'url': 'ede nadaram 2'};
pro2 = {'name': 'پورن', 'price': '۳۰۰۰', 'imgurl': 'ede nadaram', 'url': 'ede nadaram 2'};
pro3 = {'name': 'پورن', 'price': '۴۰۰۰', 'imgurl': 'ede nadaram', 'url': 'ede nadaram 2'};
pro4 = {'name': 'پورن', 'price': '۵۰۰۰', 'imgurl': 'ede nadaram', 'url': 'ede nadaram 2'};
pro5 = {'name': 'پورن', 'price': '۶۰۰۰', 'imgurl': 'ede nadaram', 'url': 'ede nadaram 2'};
products = [pro0, pro1, pro2, pro3, pro4, pro5]

trans0 = {'name': 'محصول اول', 'price': '۱۰۰۰', 'date': '1-1-1', 'time': '۱۴:۰۵'}
trans1 = {'name': 'محصول اول', 'price': '۱۰۰۰', 'date': '1-1-1', 'time': '۱۴:۰۵'}
trans2 = {'name': 'محصول اول', 'price': '۱۰۰۰', 'date': '1-1-1', 'time': '۱۴:۰۵'}
trans = [trans0, trans1, trans2]

def viewMainPage(request):
    cats = list(Category.objects.all())
    li = list(Product.objects.all().reverse())
    bestSellers = li[:6]
    ourRecom = li[6:12]
    return render(request, 'mainPage.html', {'categories': cats, 'title': 'MainPage', 'RecommandProducts': ourRecom, 'BestProducts': bestSellers})

def jsonResponse(dic):
    js = json.dumps(dic)
    return HttpResponse(js, mimetype="application/json")



def viewProductPage(request, cat):
    print('inja oomad ba cat = ' + cat)
    cc = list(Category.objects.all())
    myCat = Category.objects.get(id=cat)
    pros = []
    if myCat.parent_id is None: # khodesh babae
        cats = Category.objects.all().filter(parent_id = myCat.id)
        for c in cats:
            pros = pros + list(Product.objects.all().filter(cat_id=c.id))
    else:
        pros = list(Product.objects.all().filter(cat_id=myCat.id))
    print('pros haye nahayi ina shodan: ')
    for rr in pros:
        print(rr.name)
    if request.is_ajax():
        return jsonResponse({'products' : pros})
    else:
        return render(request, 'productPage.html', {'categories': cc, 'title': 'ProductPage'})

def viewTransactionsPage(request):
    cats = list(Category.objects.all())
    return render(request, 'transactionsPage.html', {'categories': cats, 'transactions': trans,'title': 'TransactionsPage'})


def viewSearchPage(request, ):
    cats = list(Category.objects.all())
    return render(request, 'productPage.html', {'categories': cats, 'title': 'SearchResultPage'})

def viewManagementPage(request):
    cats = list(Category.objects.all())
    return render(request, 'managementPage.html', {'categories': cats, 'title': 'ManagementPage'})