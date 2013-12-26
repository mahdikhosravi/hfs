from django.shortcuts import render


# Create your views here.
from sale.models import Category, Product


def getCats(request):

    cats = list(Category.objects.all())
    pros = list(Product.objects.all().reverse()[:12])

    return render(request, 'base.html', {'cats': cats , 'bestPros': pros})
