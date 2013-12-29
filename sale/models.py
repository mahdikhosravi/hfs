from dis import _format_code_info
from django.core.exceptions import ValidationError
from django.core.serializers import serialize, json
from django.db import models
from json import JSONEncoder
# Create your models here.
from django.utils import autoreload
from phase2 import settings


class Category(models.Model , JSONEncoder):
    parent = models.ForeignKey('self' , null=True)

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    # def save(self, *args, **kwargs(*args, **kwargs) # Call the "real" save() method.

    def clean(self):
        super(Category, self).clean()
        if not self.parent is None:
            par = Category.objects.get(id=self.parent_id)
            # print('khodesh' + self.name + '  parent = ' + a.name)
            if not par.parent is None:
                raise ValidationError("Parent should be one of the main Categories!! ")



from datetime import datetime

class Product(models.Model):
    price = models.IntegerField(null=True)
    creationDate = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    cat = models.ForeignKey(Category)
    availability = models.BooleanField(default=True)
    count = models.IntegerField(null=True , default=100)
    picture = models.ImageField(upload_to='Products/images' , null=True , blank=True)
    # picture = models.URLField(null=True)
    description = models.TextField(null=True)
    purchased = models.PositiveIntegerField(default=0)

    def as_json_general(self):
        return dict(
            id = self.id ,
            price=self.price,
            name=self.name,
            # picURL= settings.BASE_DIR +  self.picture.url
            picURL= self.picture.url
        )
    def as_json_detail(self):

        comments = list(Opinion.objects.all().filter(product_id = self.id))
        comments = [t.as_json() for t in comments]

        return dict(
            price=self.price,
            creationDate = self.creationDate.isoformat(),
            name=self.name,
            cat = self.cat.name,
            picURL= self.picture.url,
            description = self.description,
            commentList = comments
        )

 #   CREATE FULLTEXT INDEX fulltext_article_title_text
  #  ON fulltext_article (title, text);

    class Meta:
        ordering = ('-purchased',)
        verbose_name = 'محصول'
        verbose_name_plural = 'محصولات'

    def __str__(self):
        return self.name


class SlideShowProduct(models.Model):
    product = models.ForeignKey(Product)
    bigPicture = models.ImageField(upload_to='Products/slideImages')
    def __str__(self):
        return self.product.name


class Purchase(models.Model):
    date = models.DateField(auto_now_add=True)
    product = models.ForeignKey(Product)

    def __str__(self):
        return self.product.name


class Opinion(models.Model):
    product = models.ForeignKey(Product)
    creationDate = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=20)

    def as_json(self):
        return dict(
            product = self.product_id ,
            creationDate = self.creationDate.isoformat(),
            username = self.username
        )
