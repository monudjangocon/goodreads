
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.authtoken import views
from django.views.static import serve
from django.conf import settings

from books.urls import router

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', ensure_csrf_cookie(TemplateView.as_view(template_name='base.html'))),

    # For API
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^api-token-auth/', views.obtain_auth_token),

    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
