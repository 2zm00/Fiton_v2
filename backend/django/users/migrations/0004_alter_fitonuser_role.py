# Generated by Django 5.1.5 on 2025-02-04 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_fitonuser_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fitonuser',
            name='role',
            field=models.CharField(blank=True, choices=[('member', '수강생'), ('instructor', '강사'), ('centerowner', '센터장'), ('none', '없음')], max_length=20, null=True, verbose_name='역할'),
        ),
    ]
