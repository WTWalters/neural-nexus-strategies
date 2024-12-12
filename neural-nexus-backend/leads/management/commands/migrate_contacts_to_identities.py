# neural-nexus-backend/leads/management/commands/migrate_contacts_to_identities.py

from django.core.management.base import BaseCommand
from django.db import transaction
from leads.services.contact_management import ContactManagementService
from leads.models import Contact

class Command(BaseCommand):
    help = 'Migrate all contacts to have associated identities'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be migrated without making changes',
        )

    def handle(self, *args, **options):
        self.stdout.write('Starting contact migration...')

        # Count contacts needing migration
        contacts_to_migrate = Contact.objects.filter(identity__isnull=True)
        total_contacts = contacts_to_migrate.count()

        if options['dry_run']:
            self.stdout.write(f'Found {total_contacts} contacts that would be migrated')
            return

        # Perform migration
        stats = ContactManagementService.migrate_all_contacts()

        # Print results
        self.stdout.write('\nMigration completed:')
        self.stdout.write(f'Total contacts processed: {stats["total"]}')
        self.stdout.write(f'Successfully migrated: {stats["success"]}')
        self.stdout.write(f'Failed migrations: {stats["failed"]}')

        if stats['errors']:
            self.stdout.write('\nErrors encountered:')
            for error in stats['errors']:
                self.stdout.write(f'- {error}')

        self.stdout.write(self.style.SUCCESS('\nMigration completed successfully'))
