# Generated by Django 5.1.5 on 2025-01-24 02:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lessons', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='instructor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='users.instructor', verbose_name='강사'),
        ),
        migrations.AddField(
            model_name='lesson_schedule',
            name='lesson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_schedules', to='lessons.lesson', verbose_name='수업 내용'),
        ),
        migrations.AddField(
            model_name='lessonticket',
            name='lesson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_ticket', to='lessons.lesson', verbose_name='수업권 가격'),
        ),
        migrations.AddField(
            model_name='lessonticketowner',
            name='Lesson_ticket',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_ticket_owner', to='lessons.lessonticket', verbose_name='수업권'),
        ),
        migrations.AddField(
            model_name='lessonticketowner',
            name='member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_ticket_owner', to='users.member', verbose_name='수강생'),
        ),
    ]
