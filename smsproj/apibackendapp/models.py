from django.db import models
from django.contrib.auth.models import User

# Department model to store department information
class Department(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=200)
    Description = models.TextField(default="No description available")

    def __str__(self):
        return self.DepartmentName


# Admission model to track student admission information
class Admission(models.Model):
    AdmissionId = models.AutoField(primary_key=True)
    Student = models.OneToOneField('Student', on_delete=models.CASCADE)
    DateOfAdmission = models.DateField()
    Status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')])

    def __str__(self):
        return f"Admission {self.AdmissionId} for {self.Student.Name}"

# Student model to store student personal and academic information
class Student(models.Model):
    StudentId = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=200, null=True, blank=True )
    Age = models.IntegerField(null=True, blank=True)
    Department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    AdmissionId = models.OneToOneField(Admission, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.Name if self.Name else 'No Name'



# Marks model to store student marks for different subjects
class Marks(models.Model):
    MarksId = models.AutoField(primary_key=True)
    Student = models.ForeignKey(Student, related_name='marks', on_delete=models.CASCADE, null=True, default=None)
    SubjectName = models.CharField(max_length=200, default="Unknown Subject")
    TotalMarks = models.IntegerField(default=0)

    def __str__(self):
        return f"Marks for {self.Student.Name} in {self.SubjectName}"





# UserDetails model to store additional user information like phone and email
class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_details')
    PhoneNo = models.CharField(max_length=50)
    Email = models.EmailField(unique=True)

    def __str__(self):
        return self.user.username
