import json
from xml.etree.ElementPath import get_parent_map
from django.http.response import HttpResponse
from django.shortcuts import render


# Create your views here.
from sale.models import Category, Product


def getCats(request):

    cats = list(Category.objects.all())
    pros = list(Product.objects.all().reverse()[:12])

    return render(request, 'base.html', {'cats': cats , 'bestPros': pros})

def jsonResponse(dic):
    js = json.dumps(dic)
    return HttpResponse(js, mimetype="application/json")

def getSpecificCat(request , catID):
    cat = Category.objects.get(id=catID)
    pros = []
    if cat.parent_id is None: # khodesh babae
        cats = Category.objects.get(parent_id = cat.id)
        for c in cats:
            pros = pros + list(Product.objects.get(cat_id=c.id))
    else:
        pros = list(Product.objects.get(cat_id=cat.id))
    if request.is_ajax():
        return jsonResponse({'products' : pros})
    else:
        cats = list(Category.objects.all())
        render( request, 'baseCart.html' , {'cats'} )

    # return render(request)



