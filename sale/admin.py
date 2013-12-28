from django.contrib import admin

# Register your models here.
from sale.models import *


class ProductAdmin(admin.ModelAdmin):
    fields = ('price', 'name', 'cat' , 'count' , 'picture' , 'availability' , 'description')





admin.site.register(Product, ProductAdmin)
admin.site.register(SlideShowProduct)
admin.site.register(Category)
admin.site.register(Purchase)
admin.site.register(Opinion)