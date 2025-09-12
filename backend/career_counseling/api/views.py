from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer


# views.py
from rest_framework.parsers import MultiPartParser, FormParser # ફાઇલ અપલોડ માટે
from .models import UserProfile
from .serializers import UserProfileSerializer

# Django settings માંથી MEDIA_ROOT import કરો
from django.conf import settings
import os

class UserProfileListCreateView(APIView):
    # ફાઇલ અને ફોર્મ ડેટાને હેન્ડલ કરવા માટે પાર્સર્સ ઉમેરો
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        users = UserProfile.objects()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save() આપમેળે create() પદ્ધતિને કૉલ કરશે
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ... UserProfileDetailView (GET by ID, PUT, DELETE) માટેનો કોડ પણ અહીં અપડેટ કરી શકાય છે...

class StudentListCreateView(APIView):
    def get(self, request):
        students = Student.objects()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDetailView(APIView):
    def get(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            serializer = StudentSerializer(student)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            serializer = StudentSerializer(student, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
            student.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
