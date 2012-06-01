#-*- coding: UTF-8 -*- 
import codecs
from django.shortcuts import render_to_response
from django.template import Context, loader, RequestContext
from read.models import Book,UserProfile
from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.views.generic.date_based import object_detail
from django.contrib.auth.decorators import login_required
from django.utils import simplejson
@csrf_exempt
def sign_in(request):
    if request.method == 'POST' :
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            if user.is_active:
                login(request,user)
                print "login success"
                return HttpResponseRedirect('/index/')
            else:
                return HttpResponse("disabled account")
    else:
        return render_to_response("login.html")


@login_required
def index(request):
    book_list = Book.objects.all()
#load template
    if request.user.is_authenticated():
        print "authenticate"
    else :
        print "not authenticate"
    t = loader.get_template("index.html")
    c = RequestContext(request, {
        'book_list': book_list,
        'user': request.user,
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
    prev_page = str(int(page)-1)
    text = ''

#get book

    for x in xrange((int(page)-1) * 30):
        fp.readline()
    for x in xrange(30):
        text += fp.readline()
        
    if text == '' :
        text = 'The end'
        next_page = page 
    else:
        next_page = str(int(page)+1)


    fp.close()

    if  int(prev_page) <= 0 : prev_page = str(1)
    
    print book_instance.max_page_num

#load template
    t = loader.get_template("reader.html")
    c = Context({
        'text': text,
        'next_page' : next_page,
        'prev_page' : prev_page,
        'page_num': page,
        'current_page': page,
        'book_id': book_id,
        'max_page_num': book_instance.max_page_num,
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

@csrf_exempt
def test(request):
    return render_to_response('base.html')
@csrf_exempt
def print_it(request):
    jsonDict = {}
    if request.method == 'POST':
        #print  request.POST
        jsonDict['page_num'] = request.POST['current_page']
        try:
            page_num_instance = UserProfile.objects.get(pk=1)
            page_num_instance.current_page = jsonDict['page_num']
            page_num_instance.save()
            print "page_num: "+page_num_instance.current_page
        except UserProfile.DoesNotExist:
            raise Http404
        return HttpResponse(simplejson.dumps(jsonDict),mimetype='application/json')
    elif request.method == 'GET':
        try:
            page_num_instance = UserProfile.objects.get(pk=1)
            jsonDict['page_num']  = page_num_instance.current_page
        except UserProfile.DoesNotExist:
            raise Http404
        return HttpResponse(simplejson.dumps(jsonDict),mimetype='application/json')
    return HttpResponse(simplejson.dumps(jsonDice),mimetype='application/javascript')
def personal(request):
    return render_to_response('personal.html')

