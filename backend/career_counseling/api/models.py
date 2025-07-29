from mongoengine import Document, StringField, IntField

class Student(Document):
    # id= StringField(required=False)
    name = StringField(required=True)
    age = IntField(required=True)
