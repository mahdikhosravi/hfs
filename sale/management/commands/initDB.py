from django.core.management.base import BaseCommand
from sale.models import Product, Category


class Command(BaseCommand):
    def handle(self , *args , **kwargs):
        print('salam')

        c1 = Category(name = 'tanz')
        c1.save()

        c2 = Category(name='jeddi')
        c2.save()

        c3 = Category(name='jeddi1' , parent = c2)
        c3.save()

        c4 = Category(name='jeddi2' , parent = c2)
        c4.save()

        c5 = Category(name='jeddi3' , parent = c2)
        c5.save()

        c6 = Category(name='tanz1' , parent = c1)
        c6.save()

        c7 = Category(name='tenz2' , parent = c1)
        c7.save()

        p1 = Product(name='film1' , cat = c1 , availability = True , count=300, purchased = 4 )
        p1.save()

        p2 = Product(name='film2' , cat = c2 ,  purchased = 8  )
        p2.save()

        p3 = Product(name='film3' , cat = c3 ,  purchased = 5 )
        p3.save()

        p4 = Product(name='film4' , cat = c4 ,  purchased = 3 )
        p4.save()

        p5 = Product(name='film5' , cat = c4 )
        p5.save()

        p6 = Product(name='film6' , cat = c5 ,  purchased = 41 )
        p6.save()

        p7 = Product(name='salam khoobi' , cat = c5 ,  purchased = 12 )
        p7.save()

        p8 = Product(name='salam2' , cat = c5 )
        p8.save()

        p9 = Product(name='salam' , cat = c5 )
        p9.save()



