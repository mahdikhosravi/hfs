from django.conf.urls import patterns, include, url



from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
     url(r'^$', 'sale.views.getCats'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^main-page/$', 'pages.views.viewMainPage'),

    url(r'^admin/', include(admin.site.urls)),
)
