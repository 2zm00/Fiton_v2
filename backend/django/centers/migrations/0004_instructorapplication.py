# Generated by Django 5.1.5 on 2025-02-04 00:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('centers', '0003_alter_amenity_name_alter_exercise_name'),
        ('users', '0003_alter_fitonuser_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='InstructorApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', '대기 중'), ('approved', '승인됨'), ('rejected', '거절됨')], default='pending', max_length=10)),
                ('requested_at', models.DateTimeField(auto_now_add=True)),
                ('center', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='center_requests', to='centers.center')),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='center_requests', to='users.instructor')),
            ],
        ),
    ]
