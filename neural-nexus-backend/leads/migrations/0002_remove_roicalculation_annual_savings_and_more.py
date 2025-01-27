# Generated by Django 5.0 on 2024-11-17 00:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roicalculation',
            name='annual_savings',
        ),
        migrations.RemoveField(
            model_name='roicalculation',
            name='current_efficiency',
        ),
        migrations.RemoveField(
            model_name='roicalculation',
            name='projected_efficiency',
        ),
        migrations.RemoveField(
            model_name='roicalculation',
            name='technology_spend',
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='avg_salary',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Average annual salary per data team member', max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='completion_rate',
            field=models.IntegerField(blank=True, help_text='Percentage of data initiatives completed on schedule', null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='current_tools_cost',
            field=models.DecimalField(blank=True, decimal_places=2, help_text='Annual spending on data tools and infrastructure', max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='data_request_backlog',
            field=models.IntegerField(blank=True, help_text='Number of pending data requests', null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='efficiency_savings',
            field=models.DecimalField(decimal_places=2, help_text='Annual savings from improved efficiency', max_digits=15, null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='labor_cost_savings',
            field=models.DecimalField(decimal_places=2, help_text='Annual savings from reduced manual work', max_digits=15, null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='manual_hours_weekly',
            field=models.IntegerField(blank=True, help_text='Hours spent weekly on manual data tasks', null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='projected_completion_rate',
            field=models.IntegerField(help_text='Projected initiative completion rate', null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)]),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='projected_time_savings',
            field=models.IntegerField(help_text='Projected weekly hours saved', null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='report_turnaround_days',
            field=models.IntegerField(blank=True, help_text='Average days to generate and deliver reports', null=True),
        ),
        migrations.AddField(
            model_name='roicalculation',
            name='total_annual_savings',
            field=models.DecimalField(decimal_places=2, max_digits=15, null=True),
        ),
        migrations.AlterField(
            model_name='roicalculation',
            name='data_team_size',
            field=models.IntegerField(help_text='Number of data team members'),
        ),
        migrations.AlterField(
            model_name='roicalculation',
            name='payback_months',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='roicalculation',
            name='roi_percentage',
            field=models.DecimalField(decimal_places=2, max_digits=8, null=True),
        ),
    ]
