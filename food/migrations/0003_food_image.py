# Generated by Django 3.2.23 on 2024-02-24 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0002_auto_20240224_1143'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='image',
            field=models.TextField(blank=True),
        ),
    ]
