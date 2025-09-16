from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer
import cloudinary.uploader


# views.py
from rest_framework.parsers import MultiPartParser, FormParser 
from .models import UserProfile
from .serializers import UserProfileSerializer

# Django settings mathi MEDIA_ROOT import 
from django.conf import settings
import os

class UserProfileListCreateView(APIView):
    # ફાઇલ અને ફોર્મ ડેટાને હેન્ડલ કરવા માટે પાર્સર્સ ઉમેરો
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request, *args, **kwargs):
        # Make a mutable copy of the request data
        mutable_data = request.data.copy()
        
        # Check if an image file is part of the request
        if 'profile_picture' in request.FILES:
            image_file = request.FILES['profile_picture']
            
            try:
                # Upload the file to Cloudinary
                # This will return a dictionary with upload details
                upload_result = cloudinary.uploader.upload(image_file)
                
                # Extract the secure URL of the uploaded image
                image_url = upload_result.get('secure_url')
                
                # Replace the file object with the Cloudinary URL
                mutable_data['profile_picture'] = image_url
                
            except Exception as e:
                # Handle potential upload errors
                return Response(
                    {"error": f"Failed to upload image: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Now, pass the data (with the image URL) to the serializer
        serializer = UserProfileSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return validation errors if any
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        users = UserProfile.objects()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data)
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
