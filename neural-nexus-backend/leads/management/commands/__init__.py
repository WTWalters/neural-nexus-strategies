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
            email='test1@example.com',
            name='Test User 1'
        )
        self.contact2 = Contact.objects.create(
            email='test2@example.com',
            name='Test User 2'
        )
        # Contact with same email as contact1 to test duplicate handling
        self.contact3 = Contact.objects.create(
            email='test1@example.com',
            name='Test User 1 Duplicate'
        )
        # Contact without email to test edge case
        self.contact4 = Contact.objects.create(
            name='No Email User'
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
        self.assertEqual(Identity.objects.count(), 3)  # 3 because of duplicate email

        # Verify all contacts have associated identities
        self.assertEqual(
            Contact.objects.filter(identity__isnull=True).count(),
            0
        )

        # Verify email associations
        self.assertEqual(
            IdentityEmail.objects.filter(email='test1@example.com').count(),
            1
        )

    def test_duplicate_email_handling(self):
        """Test handling of contacts with duplicate emails"""
        output = self.call_command()

        # Both contacts with same email should point to same identity
        identity = Identity.objects.get(
            identityemail__email='test1@example.com'
        )
        self.assertEqual(
            Contact.objects.filter(identity=identity).count(),
            2
        )

    def test_no_email_handling(self):
        """Test handling of contacts without email addresses"""
        output = self.call_command()

        # Verify contact without email got an identity
        contact = Contact.objects.get(name='No Email User')
        self.assertIsNotNone(contact.identity)

    def test_idempotency(self):
        """Test running the migration multiple times"""
        # Run first time
        self.call_command()
        initial_identity_count = Identity.objects.count()

        # Run second time
        output = self.call_command()

        # Verify no new identities were created
        self.assertEqual(Identity.objects.count(), initial_identity_count)
        self.assertIn('Total contacts processed: 0', output)

    def test_error_handling(self):
        """Test handling of errors during migration"""
        # Create a contact that will cause an error
        Contact.objects.create(
            email='invalid@',  # Invalid email format
            name='Invalid Email User'
        )

        output = self.call_command()

        # Verify error was logged
        self.assertIn('Failed migrations:', output)
        self.assertGreater(
            output.count('Errors encountered:'),
            0
        )

    def test_transaction_rollback(self):
        """Test that failed migrations don't leave partial data"""
        # Create a contact that will cause an error
        Contact.objects.create(
            email='@invalid',  # Invalid email format
            name='Invalid Email User'
        )

        # Mock ContactManagementService to raise an error
        def mock_migrate_contact(*args):
            raise IntegrityError("Test error")

        original_migrate = ContactManagementService.migrate_contact
        ContactManagementService.migrate_contact = staticmethod(mock_migrate)

        try:
            output = self.call_command()
        finally:
            # Restore original method
            ContactManagementService.migrate_contact = original_migrate

        # Verify no partial data was left
        self.assertEqual(
            Contact.objects.filter(identity__isnull=False).count(),
            0
        )
