from django.urls import path
from .views import StudentListCreateView, StudentDetailView, UserDetailView, UserView

urlpatterns = [
    
    path('students/', StudentListCreateView.as_view()),  # http://127.0.0.1:8000/api/students/
    path('students/<str:pk>/', StudentDetailView.as_view(), name='student-detail'), # http://127.0.0.1:8000/api/students/<str:pk>/ for detail view

    path('users/', UserView.as_view(), name='user-create-fetch'),  # http://127.0.0.1:8000/api/users/

    path('users/<str:id>/', UserDetailView.as_view(), name='user-detail'), # http://127.0.0.1:8000/api/users/<str:id>/
                                                                            
    path('users/email/<str:email>/', UserDetailView.as_view(), name='user-detail-by-email'), # http://127.0.0.1:8000/api/users/email/<str:email>/

]
