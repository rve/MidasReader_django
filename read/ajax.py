from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from dajaxice.core import dajaxice_functions
from dajax.core import Dajax


@dajaxice_register
def myexample(request):
    return simplejson.dumps({'message':'Hello World'})

@dajaxice_register
def multiply(request, a, b):
    if (Dajax()):
        print "Dajax() ok"
    dajax = Dajax()
    result = int(a) * int(b)
    dajax.assign('#result','value',str(result))
    return dajax.json()

@dajaxice_register
def returnPage(request,user, book_id, page_num):
    dajax = Dajax()
    print "test"
    return dajax.json()
def tmp(requst):
    book = Read.objects.get(pk = book_id)
    print book_id 
    print page_num
    user_profile = Read.objects.get(name = user.username+" @ "+book.book_name )
    user_profile.page = page_num
    print "database ok"
    print user_profile.pgae
    return dajax.json()
    

