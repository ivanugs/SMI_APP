from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"", views.PaseViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path("expertos/<int:data03>/<int:data04>/", views.PaseViewSet.as_view({"get": "expertos"}), name="expertos"),
]
