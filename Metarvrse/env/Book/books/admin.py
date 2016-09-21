from django.contrib import admin

from .models import BookDetail


class BookDetailAdmin(admin.ModelAdmin):
    pass

admin.site.register(BookDetail, BookDetailAdmin)
