from mongoengine import Document, StringField, IntField, EmailField, ListField
# models.py


class UserProfile(Document):
    full_name = StringField(required=True, max_length=100)
    email = EmailField(required=True, unique=True)
    mobile = StringField(required=True, max_length=15, unique=True)
    password = StringField(required=True) # નોંધ: પાસવર્ડને હંમેશા હેશ કરીને સ્ટોર કરવો જોઈએ
    age = IntField(required=True)
    gender = StringField(required=True, max_length=10)
    education_level = StringField(required=True, max_length=50)
    career_interest = ListField(StringField(max_length=50), required=True)
    preferred_language = StringField(required=True, max_length=50)
    location = StringField(required=True, max_length=100)
    profile_picture = StringField() # અહીં આપણે ફાઇલનો પાથ સ્ટોર કરીશું

    # આ MongoEngine ને જણાવે છે કે કયા કલેક્શનનો ઉપયોગ કરવો
    meta = {'collection': 'user'}
class Student(Document):
    # id= StringField(required=False)
    name = StringField(required=True)
    age = IntField(required=True)
