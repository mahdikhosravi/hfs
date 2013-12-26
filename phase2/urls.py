from django.conf.urls import patterns, include, url



from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
     url(r'^$', 'sale.views.test1'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^main-page/$', 'pages.views.viewMainPage'),
    url(r'^main-page?cat=(\d+)' , 'pages.views.search'),
    url(r'^admin/', include(admin.site.urls)),
)
