from django.shortcuts import render


# Create your views here.
from sale.models import Category


def test1 (request):
    a = '<html> <body> this is a test </body></html>' ;

    t = Category()
    t.name = 'comic'
    t.save()


    return render(request, 'base.html', {'salam': 'torokhoda doros chap koni :D '})
