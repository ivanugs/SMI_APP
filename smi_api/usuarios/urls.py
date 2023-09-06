from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth import views as auth_views
from .views import RegisterView, LoginView, TokenRefreshView, UserView, LogoutView

# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )

urlpatterns = [
    path("register", RegisterView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile", UserView.as_view(), name="profile"),
    path("logout", LogoutView.as_view(), name="logout"),
    path(
        "change-password/",
        auth_views.PasswordChangeView.as_view(
            template_name="users/change-password.html"
        ),
        name="change-password",
    ),
    path(
        "password_change/done/",
        auth_views.PasswordChangeDoneView.as_view(
            template_name="users/password_reset_done.html"
        ),
        name="password_change_done",
    ),
    path(
        "password_reset/",
        auth_views.PasswordResetView.as_view(
            template_name="users/forgot-password.html",
            subject_template_name="users/password_reset_subject.txt",
            html_email_template_name="users/password_reset_email.html",
        ),
        name="password_reset",
    ),
    path(
        "password_reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="users/password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="users/password_reset_confirm.html"
        ),
        name="password_reset_confirm",
    ),
    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="users/password_reset_complete.html"
        ),
        name="password_reset_complete",
    ),
]

