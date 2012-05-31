from django.conf.urls import patterns, include, url
from django.core.urlresolvers import reverse_lazy
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'reader.views.home', name='home'),
    url(r'^reader/$', 'read.views.index'),
    url(r'^reader/(?P<book_id>\d+)/(?P<page>\d+)/$', 'read.views.reader'),
    url(r'^index/$','read.views.index', name = 'index'),
    url(r'^login/$','read.views.sign_in',name='sign_in'),
    url(r'^display_meta/$', 'read.views.display_meta'),
    url(r'^search-form/$', 'read.views.search_form'),
    url(r'^search/$','read.views.search'),
    url(r'^test/$','read.views.test'),
    url(r'^print/$','read.views.print_it'),

    # Uncomment the admin/doc line below to enable admin documentation:
    #url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
