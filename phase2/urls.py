from django.conf.urls import patterns, include, url



from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
     url(r'^$', 'sale.views.test1'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^main-page/$', 'pages.views.viewMainPage'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^category/(?P<cat>\d+)$', 'pages.views.viewProductPage', name='productsPage'),
    url(r'^search/$', 'pages.views.viewSearchPage', name='searchPage'),
    url(r'^management/$', 'pages.views.viewManagementPage', name='managementPage'),

    )
