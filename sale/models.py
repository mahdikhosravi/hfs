from dis import _format_code_info
from django.db import models

# Create your models here.

class Category(models.Model):
    parent = models.ForeignKey('self' , null=True)
    name = models.CharField(max_length=50)


class Product(models.Model):
    price = models.IntegerField()
    name = models.CharField(max_length=50)
    cat = models.ForeignKey(Category)
    availability = models.BooleanField(default=True)
    count = models.IntegerField()
    picture = models.CharField(max_length=1000)



class slideShowProduct(models.Model):
    product = models.ForeignKey(Product)
    bigPicture = models.CharField(max_length=1000)
