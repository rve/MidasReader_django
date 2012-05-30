#-*- coding: UTF-8 -*- 
import codecs
from django.shortcuts import render_to_response
from django.template import Context, loader
from read.models import Book
from django.http import HttpResponse
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
@csrf_exempt
def sign_in(request):
    if(request.POST):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            if user.is_active:
                login(request,user)
                return HttpResponse("login sucess")
            else:
                return HttpResponse("disabled account")
    else:
        return render_to_response("login.html")


def index(request):
#test
    print("whats the  fuck print")
    book_list = Book.objects.all()
#load template
    t = loader.get_template("index.html")
    c = Context({
        'book_list': book_list,
        })
    return HttpResponse(t.render(c))
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
        'current_page':page,
        'book_id' : book_id,
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
    return render_to_response('search_form.html')
def search(request):
    if 'q' in request.GET:
        message = 'Your search for: %r' % request.GET['q']
    else:
        message = 'You submitted an empty form.'
    return HttpResponse('<h1> %s </h1>' % message)

