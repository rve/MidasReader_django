from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'reader.views.home', name='home'),
    url(r'^reader/$', 'read.views.index'),
    url(r'^reader/(?P<page>\d+)/$', 'read.views.reader2'),
    url(r'^reader/(?P<book_id>\d+)/(?P<page>\d+)/$', 'read.views.reader'),
    url(r'^index/','read.views.index'),
    url(r'^test/', 'read.views.display_meta'),
    url(r'^search-form/$', 'read.views.search_form'),
    url(r'^search/$','read.views.search'),
    url(r'^image_data','read.views.my_image'),

    # Uncomment the admin/doc line below to enable admin documentation:
    #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
