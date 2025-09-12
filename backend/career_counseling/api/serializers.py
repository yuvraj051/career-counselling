# api/serializers.py

from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer
from rest_framework_mongoengine.validators import UniqueValidator
from .models import UserProfile


class UserProfileSerializer(DocumentSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=UserProfile.objects.all(),
                message="An account with this email address already exists."
            )
        ]
    )
    
    # Ensure you use "serializers.StringField" here
    mobile = serializers.StringField(
        required=True,
        max_length=15,
        validators=[
            UniqueValidator(
                queryset=UserProfile.objects.all(),
                message="An account with this mobile number already exists."
            )
        ]
    )

    class Meta:
        model = UserProfile
        fields = '__all__'
        
    def create(self, validated_data):
        # અત્યારે આપણે પાસવર્ડને સાદો ટેક્સ્ટ રાખી રહ્યા છીએ,
        # પરંતુ પ્રોડક્શનમાં Django ની make_password() પદ્ધતિનો ઉપયોગ કરવો.
        # from django.contrib.auth.hashers import make_password
        # validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
class StudentSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    age = serializers.IntegerField()

    def create(self, validated_data):
        return Student(**validated_data).save()

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.save()
        return instance
