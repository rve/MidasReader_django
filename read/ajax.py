from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from dajaxice.core import dajaxice_functions

@dajaxice_register
def myexample(request):
    return simplejson.dumps({'message':'Hello World'})

