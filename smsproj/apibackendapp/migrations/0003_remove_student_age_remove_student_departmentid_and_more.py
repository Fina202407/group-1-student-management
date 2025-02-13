# Generated by Django 5.1.5 on 2025-02-06 08:14

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apibackendapp', '0002_remove_marks_totalmarks_marks_subject1'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='Age',
        ),
        migrations.RemoveField(
            model_name='student',
            name='DepartmentId',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Name',
        ),
        migrations.AddField(
            model_name='student',
            name='DateOfBirth',
            field=models.DateField(default='2000-01-01'),
        ),
        migrations.AddField(
            model_name='student',
            name='EnrollmentDate',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='student',
            name='FirstName',
            field=models.CharField(default='John', max_length=100),
        ),
        migrations.AddField(
            model_name='student',
            name='LastName',
            field=models.CharField(default='Doe', max_length=100),
        ),
    ]
