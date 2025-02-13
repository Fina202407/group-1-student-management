from rest_framework import serializers
from .models import Department, Student, UserDetails, Admission, Marks
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password

# Signup Serializer

class SignupSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True, required=False)  # Role field for user role (admin, staff, student)

    def create(self, validated_data):
        # Remove the role data to handle it later after user creation
        role = validated_data.pop("role", None)

        # Use create_user instead of create to handle password hashing automatically
        user = User.objects.create_user(**validated_data)  # This automatically hashes the password

        # After user creation, assign a role if provided (use Group for role management)
        if role:
            group, created = Group.objects.get_or_create(name=role)  # Create or get the group
            user.groups.add(group)  # Add the user to this group (role)

        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'role']


# Login Serializer
class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'password']

# Department Serializer
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['StudentId', 'Name', 'Age', 'Department', 'AdmissionId']
        read_only_fields = ['StudentId']
        extra_kwargs = {
            'AdmissionId': {'required': False}  # Make AdmissionId optional
        }

# Admission Serializer
class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = ('AdmissionId', 'Student', 'DateOfAdmission', 'Status')

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marks
        fields = '__all__'

# UserDetails Serializer
class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'

# User Serializer (For handling user-related information)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'is_superuser')
