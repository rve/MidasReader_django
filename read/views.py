#-*- coding: UTF-8 -*- 
import codecs
from django.shortcuts import render_to_response
from django.template import Context, loader
from read.models import Book
from django.http import HttpResponse
from django.http import Http404

def my_image(request):
    image_data = open("/home/rve/Pictures/screenshot.jpg","rb").read()
    return HttpResponse(image_data, mimetype="image/jpg")

def index(request):
    return render_to_response('reader/index.html')
def reader(request, book_id, page):
#get book
    try:
        book_instance = Book.objects.get(pk=book_id)
    except Book.DoesNotExist:
        raise Http404

#read text of the book
    fp = open(book_instance.txt_path)
    fp.seek((int(page)-1) *1000)
    prev_page = str(int(page)-1)
    if fp.read(1) == '':
        text = 'The end'
        next_page = page 
    else:
        fp.seek((int(page)-1) *1000)
        text =  ( fp.read(1000) )
        next_page = str(int(page)+1)
    if prev_page == '0' : prev_page ='1'

    fp.close()

#load template
    t = loader.get_template("reader.html")
    c = Context({
        'text': text,
        'next_page' : next_page,
        'prev_page' : prev_page,
        'book_id' : book_id,
        })
    return HttpResponse(t.render(c))
def reader2(request, page):
    fp = open("static/txt/past-core.txt")
    fp.seek((int(page)-1) *1000)
    prev_page = str(int(page)-1)
    if fp.read(1) == '':
        text = 'The end'
        next_page = page 
    else:
        fp.seek((int(page)-1) *1000)
        text =  ( fp.read(1000) )
        next_page = str(int(page)+1)

    fp.close()
    if prev_page == '0' : prev_page ='1'

    t = loader.get_template("2reader.html")

    c = Context({
        'text': text,
        'next_page' : next_page,
        'prev_page' : prev_page,
        })
    return HttpResponse(t.render(c))
def display_meta(request):
    values = request.META.items()
    values.sort()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td<td> %s</td></tr>' % (k, v) )
    return HttpResponse('<table>%s</table>' % '\n'.join(html))
def search_form(request):
    return render_to_response('reader/search_form.html')
def search(request):
    if 'q' in request.GET:
        message = 'Your search for: %r' % request.GET['q']
    else:
        message = 'You submitted an empty form.'
    return HttpResponse('<h1> %s </h1>' % message)

