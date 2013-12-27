from dis import _format_code_info
from django.core.exceptions import ValidationError
from django.db import models

# Create your models here.
from django.utils import autoreload


class Category(models.Model):
    parent = models.ForeignKey('self' , null=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    # def save(self, *args, **kwargs(*args, **kwargs) # Call the "real" save() method.

    def clean(self):
        super(Category, self).clean()
        if not self.parent is None:
            a  = Category.objects.get(id=self.parent_id)
            # print('khodesh' + self.name + '  parent = ' + a.name)
            if not a.parent is None:
                raise ValidationError("Parent should be one of the main Categories!! ")



from datetime import datetime

class Product(models.Model):
    price = models.IntegerField(null=True)
    creationDate = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    cat = models.ForeignKey(Category)
    availability = models.BooleanField(default=True)
    count = models.IntegerField(null=True)
    picture = models.URLField(null=True)
    description = models.TextField(null=True)
    purchased = models.PositiveIntegerField(default=0)


 #   CREATE FULLTEXT INDEX fulltext_article_title_text
  #  ON fulltext_article (title, text);

    class Meta:
        ordering = ('purchased',)

    def __str__(self):
        return self.name





class SlideShowProduct(models.Model):
    product = models.ForeignKey(Product)
    bigPicture = models.URLField()
    def __str__(self):
        return self.product.name

class Purchase(models.Model):
    date = models.DateField(auto_now_add=True)
    product = models.ForeignKey(Product)

    def __str__(self):
        return self.product.name

