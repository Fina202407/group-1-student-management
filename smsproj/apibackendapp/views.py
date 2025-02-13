from django.shortcuts import render
from .models import Student, Department, Marks, Admission, UserDetails
from .serializers import StudentSerializer, DepartmentSerializer, MarksSerializer, AdmissionSerializer, UserDetailsSerializer, SignupSerializer, LoginSerializer
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

# Signup API View - Handles user signup and JWT creation
class SignupAPIView(APIView):
    permission_classes = [AllowAny]  # Allows public access for signup

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Save the user object
            token, created = Token.objects.get_or_create(user=user)  # Create a token for the user
            return Response({
                "user_id": user.id,
                "username": user.username,
                "token": token.key,
                #"role": user.groups.all()[0].id if user.groups.exists() else None
                "role": user.groups.first().name if user.groups.exists() else None

            }, status=status.HTTP_201_CREATED)

# Login API View - Handles user login and JWT retrieval
class LoginAPIView(APIView):
    permission_classes = [AllowAny]  # Allows public access for login

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(request, username=username, password=password)

            if user is not None:
                token, created = Token.objects.get_or_create(user=user)

                return Response({
                    "user_id": user.id,
                    "username": user.username,
                    "role": user.groups.first().name if user.groups.exists() else None,
                    "token": token.key,
                }, status=status.HTTP_200_OK)
                
            return Response({
                "status": status.HTTP_401_UNAUTHORIZED,
                "message": "Invalid username or password",
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Bad request",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = []  # Ensure only logged-in users can log out

    def post(self, request):
        try:
            token = Token.objects.get(user=request.user)  # Get user's token
            token.delete()  # Delete token to log out user
            return Response({"message": "Logout successful"}, status=200)
        except Token.DoesNotExist:
            return Response({"error": "Invalid token or already logged out"}, status=400)

# ViewSet for managing students
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = []

    def perform_create(self, serializer):
        # Optionally handle custom create logic for students
        serializer.save()

# ViewSet for managing departments
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = []

# ViewSet for managing marks
class MarksViewSet(viewsets.ModelViewSet):
    queryset = Marks.objects.all()
    serializer_class = MarksSerializer
    permission_classes = []

# ViewSet for managing admission records
class AdmissionViewSet(viewsets.ModelViewSet):
    queryset = Admission.objects.all()
    serializer_class = AdmissionSerializer
    permission_classes = []

# ViewSet for user details (extra information beyond default User model)
class UserDetailsViewSet(viewsets.ModelViewSet):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = []
