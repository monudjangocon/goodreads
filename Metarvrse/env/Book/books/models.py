from django.db import models
from django.conf import settings


class BookDetail(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    book_name       = models.CharField(max_length=300)
    author_name     = models.CharField(max_length=100,blank=True)
    isbn_code       = models.CharField(max_length=20, blank=True)
    cover_image     = models.ImageField(upload_to="images")
    

    def __unicode__(self):
        return '%s written by %s ' % (self.book_name, self.author_name)
