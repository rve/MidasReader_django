#-*- coding: UTF-8 -*- 
from django.shortcuts import render_to_response
from django.template import Context, loader
from read.models import Book
from django.http import HttpResponse

def my_image(request):
    image_data = open("/home/rve/Pictures/screenshot.jpg","rb").read()
    return HttpResponse(image_data, mimetype="image/jpg")

def index(request):
    return render_to_response('reader/index.html')
def reader(request):
    latest_book_list = Book.objects.all()
    t = loader.get_template("reader/reader.html")
    c = Context({
        'latest_book_list': latest_book_list,
        })
    return HttpResponse(t.render(c))
def reader2(request, page):
    fp = open("/home/rve/Downloads/Book/past-core.txt")
    fp.seek((int(page)-1) *1000)
    if fp.read(1) == '':
        text = 'The end'
    else:
        text =  fp.read(1000).decode('gb18030')

    next_page = str(int(page)+1)
    prev_page = str(int(page)-1)
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

