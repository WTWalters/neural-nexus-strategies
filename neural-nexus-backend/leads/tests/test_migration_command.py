from io import StringIO
from django.test import TestCase
from django.core.management import call_command
from django.db import IntegrityError
from leads.models import Contact, Identity, IdentityEmail
from leads.services.contact_management import ContactManagementService

class MigrateContactsCommandTest(TestCase):
    def setUp(self):
        # Create test contacts with various scenarios
        self.contact1 = Contact.objects.create(
            first_name='Test',
            last_name='User 1',
            email='test1@example.com',
            company='Test Company 1'
        )

        self.contact2 = Contact.objects.create(
            first_name='Test',
            last_name='User 2',
            email='test2@example.com',
            company='Test Company 2'
        )

        # Contact with same email as contact1 to test duplicate handling
        self.contact3 = Contact.objects.create(
            first_name='Test',
            last_name='User 3',
            email='test3@example.com',  # Changed to unique email due to unique constraint
            company='Test Company 3'
        )

        # Contact with minimal required fields
        self.contact4 = Contact.objects.create(
            first_name='No',
            last_name='Email User',
            email='test4@example.com',  # Email is required
            company='Test Company 4'
        )

    def call_command(self, *args, **kwargs):
        out = StringIO()
        call_command(
            'migrate_contacts_to_identities',
            *args,
            stdout=out,
            stderr=StringIO(),
            **kwargs
        )
        return out.getvalue()

    def test_dry_run(self):
        """Test that dry run mode doesn't make any changes"""
        output = self.call_command(dry_run=True)

        # Verify output shows correct number of contacts
        self.assertIn('Found 4 contacts that would be migrated', output)

        # Verify no changes were made
        self.assertEqual(
            Contact.objects.filter(identity__isnull=True).count(),
            4
        )

    def test_successful_migration(self):
        """Test successful migration of contacts to identities"""
        output = self.call_command()

        # Verify all contacts were processed
        self.assertIn('Total contacts processed: 4', output)
        self.assertIn('Successfully migrated: 4', output)
        self.assertIn('Failed migrations: 0', output)

        # Verify identities were created
        self.assertEqual(Identity.objects.count(), 4)  # One for each contact due to unique email constraint

        # Verify all contacts have associated identities
        self.assertEqual(
            Contact.objects.filter(identity__isnull=True).count(),
            0
        )

    def test_error_handling(self):
        """Test handling of errors during migration"""
        # Create a contact with invalid email to test error handling
        Contact.objects.create(
            first_name='Invalid',
            last_name='Email User',
            email='invalid@example',  # Invalid email format
            company='Test Company'
        )

        output = self.call_command()

        # Verify error was logged
        self.assertIn('Failed migrations:', output)

    def test_idempotency(self):
        """Test running the migration multiple times"""
        # Run first time
        self.call_command()
        initial_identity_count = Identity.objects.count()

        # Run second time
        output = self.call_command()

        # Verify no new identities were created
        self.assertEqual(Identity.objects.count(), initial_identity_count)

    def test_transaction_rollback(self):
        """Test that failed migrations don't leave partial data"""
        # Mock ContactManagementService to raise an error
        original_migrate = ContactManagementService.migrate_contact_to_identity

        def mock_migrate(*args, **kwargs):
            raise IntegrityError("Test error")

        ContactManagementService.migrate_contact_to_identity = staticmethod(mock_migrate)

        try:
            # The command should handle the error and continue
            output = self.call_command()

            # Verify the error was reported in stats
            self.assertIn('Failed migrations:', output)
            self.assertIn('Test error', output)

            # Verify all contacts still have null identities due to rollback
            self.assertEqual(
                Contact.objects.filter(identity__isnull=False).count(),
                0
            )

            # Verify no identities were created and persisted
            self.assertEqual(
                Identity.objects.count(),
                0
            )

        finally:
            # Restore original method
            ContactManagementService.migrate_contact_to_identity = original_migrate
