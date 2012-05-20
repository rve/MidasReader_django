from django.db import models

class Book(models.Model):
    test_text = models.CharField(max_length=500)
    pub_date = models.DateTimeField('date published')
    author = models.CharField(max_length=100)
    book_name = models.CharField(max_length=500)
    cover_path = models.CharField(max_length=100)
    txt_path = models.CharField(max_length=100)

    def __unicode__(self):
        return self.test_text
class tag(models.Model):
    tag_name = models.CharField(max_length=100)
    def __unicode__(self):
        return self.tag_name
class user(models.Model):
    username = models.CharField(max_length=100)
    def __unicode__(self):
        return self.username
