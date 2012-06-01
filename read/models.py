from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    pub_date = models.DateTimeField('date published')
    author = models.CharField(max_length=100)
    book_name = models.CharField(max_length=500)
    cover_path = models.CharField(max_length=100)
    txt_path = models.CharField(max_length=100)
    max_page_num = models.IntegerField()

    def __unicode__(self):
        return self.book_name
class tag(models.Model):
    tag_name = models.CharField(max_length=100)
    
    def __unicode__(self):
        return self.tag_name

class UserProfile(models.Model):
    # This field is required.
    user = models.OneToOneField(User)

    current_book = models.ForeignKey(Book)
    current_page = models.IntegerField()
    def __unicode__(self):
        return self.user.username +' @ '+ self.current_book.book_name
