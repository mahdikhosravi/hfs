from django.core.management.base import BaseCommand
from sale.models import Product, Category


class Command(BaseCommand):
    def handle(self , *args , **kwargs):
        print('salam')

        c2 = Category(name = 'فیلم و سریال')
        c2.save()

        c1 = Category(name='کتاب')
        c1.save()

        c3 = Category(name='سینمایی' , parent = c2)
        c3.save()

        c4 = Category(name='کارتون' , parent = c2)
        c4.save()

        c5 = Category(name='سریال' , parent = c2)
        c5.save()

        c6 = Category(name='رمان' , parent = c1)
        c6.save()

        c7 = Category(name='تاریخی' , parent = c1)
        c7.save()

        p1 = Product(name='film1' , cat = c3 , availability = True , count=300, purchased = 4 )
        p1.picture = 'Products/images/1.jpg'
        p1.save()

        p2 = Product(name='film2' , cat = c4 ,  purchased = 8  , price = 1000)
        p2.picture = 'Products/images/2.jpg'
        p2.save()

        p3 = Product(name='film3' , cat = c3 ,  purchased = 5 , price = 2000)
        p3.picture = 'Products/images/3.jpg'
        p3.save()

        p4 = Product(name='film4' , cat = c4 ,  purchased = 3 , price = 20001)
        p4.picture = 'Products/images/4.jpg'
        p4.save()

        p5 = Product(name='film5' , cat = c4 , price = 2002)
        p5.picture = 'Products/images/5.jpg'
        p5.save()

        p6 = Product(name='film6' , cat = c5 ,  purchased = 41 , price = 2003 )
        p6.picture = 'Products/images/6.jpg'
        p6.save()

        p7 = Product(name='salam khoobi' , cat = c5 ,  purchased = 12 , price = 2007)
        p7.picture = 'Products/images/7.jpg'
        p7.save()

        p8 = Product(name='salam2' , cat = c5 , price = 2200)
        p8.picture = 'Products/images/8.jpg'
        p8.save()

        p9 = Product(name='salam' , cat = c5 , price = 4000)
        p9.picture = 'Products/images/9.jpg'
        p9.save()

        for i in range(20):
            t = Product(name = 'myPro' + str(i) , cat = c5 , price = 1000 , picture = 'Products/images/' + str(i%10) + '.jpg')
            t.save()

