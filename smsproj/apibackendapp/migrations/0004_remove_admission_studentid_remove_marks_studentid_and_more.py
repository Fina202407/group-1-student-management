# Generated by Django 5.1.6 on 2025-02-06 18:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apibackendapp', '0003_remove_student_age_remove_student_departmentid_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='admission',
            name='StudentId',
        ),
        migrations.RemoveField(
            model_name='marks',
            name='StudentId',
        ),
        migrations.RemoveField(
            model_name='marks',
            name='Subject1',
        ),
        migrations.RemoveField(
            model_name='student',
            name='DateOfBirth',
        ),
        migrations.RemoveField(
            model_name='student',
            name='EnrollmentDate',
        ),
        migrations.RemoveField(
            model_name='student',
            name='FirstName',
        ),
        migrations.RemoveField(
            model_name='student',
            name='LastName',
        ),
        migrations.AddField(
            model_name='admission',
            name='Student',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='apibackendapp.student'),
        ),
        migrations.AddField(
            model_name='department',
            name='Description',
            field=models.TextField(default='No description available'),
        ),
        migrations.AddField(
            model_name='marks',
            name='Student',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='marks', to='apibackendapp.student'),
        ),
        migrations.AddField(
            model_name='marks',
            name='SubjectName',
            field=models.CharField(default='Unknown Subject', max_length=200),
        ),
        migrations.AddField(
            model_name='marks',
            name='TotalMarks',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='student',
            name='AdmissionId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='apibackendapp.admission'),
        ),
        migrations.AddField(
            model_name='student',
            name='Age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='student',
            name='Department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='apibackendapp.department'),
        ),
        migrations.AddField(
            model_name='student',
            name='Name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='admission',
            name='Status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')], max_length=20),
        ),
    ]
