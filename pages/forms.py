from _csv import field_size_limit
from django.forms import forms
from django.db import models
from django.forms.models import ModelForm
from sale.models import Product


class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'picture', 'cat', 'count']

        # widgets = {
        #     'name': models.CharField(attrs={'class': 'productName'}),
        #     'price': models.IntegerField(attrs={'class': 'productPrice'}),
        # }

        # price = models.IntegerField(null=True)
        # creationDate = models.DateTimeField(auto_now_add=True)
        # name = models.CharField(max_length=50)
        # cat = models.ForeignKey(Category)
        # availability = models.BooleanField(default=True)
        # count = models.IntegerField(null=True , default=100)
        # picture = models.ImageField(upload_to='Products/images' , null=True , blank=True)
        # # picture = models.URLField(null=True)
        # description = models.TextField(null=True)
        # purchased = models.PositiveIntegerField(default=0)