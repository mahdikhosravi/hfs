from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       #  url(r'^$', 'sale.views.test1'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^main-page/$', 'pages.views.viewMainPage', name='mainPage'),
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^category/(?P<cat>\d+)$', 'pages.views.viewProductPage', name='productsPage'),
                       url(r'^search/$', 'pages.views.viewSearchPage', name='searchPage'),
                       url(r'^management/$', 'pages.views.viewManagementPage', name='managementPage'),
                       url(r'^ItemPage/(?P<ProID>\d+)' , 'pages.views.viewItem' , name='itemPage'),
                       url(r'^transactions/$', 'pages.views.viewTransactionsPage', name='transactionsPage'),
                       url(r'sale-management/buy/(?P<ProID>\d+)', 'pages.views.buyItem' , name='buyItem'),
                       url(r'sale-management/remove/(?P<ProID>\d+)', 'pages.views.removeItem' , name='removeItem'),


) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
