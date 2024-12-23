# Generated by Django 5.0 on 2024-12-11 04:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0007_casestudy_excerpt"),
    ]

    operations = [
        migrations.CreateModel(
            name="CaseStudyCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("slug", models.SlugField(unique=True)),
                ("description", models.TextField(blank=True)),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name_plural": "Case Study Categories",
                "ordering": ["name"],
            },
        ),
        migrations.AddField(
            model_name="casestudy",
            name="category",
            field=models.ForeignKey(
                blank=True,
                help_text="Primary service category this case study relates to",
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="case_studies",
                to="content.casestudycategory",
            ),
        ),
    ]
