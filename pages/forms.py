from _csv import field_size_limit
from django.forms.models import ModelForm
from sale.models import Product


class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = [ 'name' , 'price' , 'description' , 'picture' , 'cat' , 'count']



#
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