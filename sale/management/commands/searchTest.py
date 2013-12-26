from datetime import datetime
import datetime
from django.core.management.base import BaseCommand
from sale.models import Product

class Command(BaseCommand):
    def handle(self , *args , **kwargs):

        print('inside search')
        # a = datetime.now()
        # a = datetime()
        a = 'film'
        pros = list(Product.objects.all())

        pros2 = list(Product.objects.filter(name__search ="salam"))
        # print(pros2.__str__())
        print(type(pros2))

        Product.objects.sea