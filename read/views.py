from django.shortcuts import render_to_response
from django.template import Context, loader
from read.models import Book
from django.http import HttpResponse


def index(request):
    return render_to_response('reader/index.html')
def reader(request):
    latest_book_list = Book.objects.all()
    t = loader.get_template("reader/reader.html")
    c = Context({
        'latest_book_list': latest_book_list,
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

