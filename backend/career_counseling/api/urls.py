from django.urls import path
from .views import StudentListCreateView, StudentDetailView

urlpatterns = [
    path('students/', StudentListCreateView.as_view()),  # http://127.0.0.1:8000/api/students/
     path('students/<str:pk>/', StudentDetailView.as_view(), name='student-detail'), # http://127.0.0.1:8000/api/students/<str:pk>/ for detail view
]
