# Generated by Django 3.2.23 on 2024-02-02 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('restaurant', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=10)),
                ('location', models.CharField(max_length=10)),
                ('description', models.TextField(blank=True)),
            ],
        ),
    ]
