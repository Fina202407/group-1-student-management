from django.contrib import admin
from .models import Department, Student, Admission, Marks, UserDetails
from rest_framework.authtoken.models import Token

# Register models in Django Admin
admin.site.register(Department)
admin.site.register(Student)
admin.site.register(Admission)
admin.site.register(Marks)
admin.site.register(UserDetails)
admin.site.register(Token)



