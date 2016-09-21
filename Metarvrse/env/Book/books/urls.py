from rest_framework.routers import DefaultRouter

from .views import BookViewSet, UserViewSet

router = DefaultRouter()
router.register('books', BookViewSet, base_name='books')
router.register('users', UserViewSet)
