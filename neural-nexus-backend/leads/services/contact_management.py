# neural-nexus-backend/leads/services/contact_management.py

from django.db import transaction
from typing import Optional, Tuple
from ..models import Contact, Identity, IdentityEmail

class ContactManagementService:
    @staticmethod
    @transaction.atomic
    def create_contact_with_identity(
        first_name: str,
        last_name: str,
        email: str,
        company: str,
        **contact_kwargs
    ) -> Tuple[Contact, bool]:
        """
        Create a new contact with an associated identity.
        Returns (contact, created) tuple.
        """
        # First try to find existing identity by email
        identity, identity_created = Identity.objects.get_or_create_from_email(email=email)

        # Check for existing contact with this email
        contact = Contact.objects.filter(email=email).first()
        if contact:
            if not contact.identity:
                contact.identity = identity
                contact.save(update_fields=['identity'])
            return contact, False

        # Create new contact
        contact = Contact.objects.create(
            identity=identity,
            first_name=first_name,
            last_name=last_name,
            email=email,
            company=company,
            **contact_kwargs
        )

        return contact, True

    @staticmethod
    @transaction.atomic
    def migrate_contact_to_identity(contact: Contact) -> Tuple[bool, Optional[str]]:
        """
        Migrate an existing contact to have an identity.
        Returns (success, error_message).
        """
        try:
            if contact.identity:
                return True, None  # Already has identity

            # Create or get identity
            identity, created = Identity.objects.get_or_create_from_email(
                email=contact.email
            )

            # Update contact
            contact.identity = identity
            contact.save(update_fields=['identity'])

            return True, None

        except Exception as e:
            return False, str(e)

    @classmethod
    def migrate_all_contacts(cls) -> dict:
        """
        Migrate all contacts to have identities.
        Returns statistics about the migration.
        """
        stats = {
            'total': 0,
            'success': 0,
            'failed': 0,
            'errors': []
        }

        contacts = Contact.objects.filter(identity__isnull=True)
        stats['total'] = contacts.count()

        for contact in contacts:
            success, error = cls.migrate_contact_to_identity(contact)
            if success:
                stats['success'] += 1
            else:
                stats['failed'] += 1
                stats['errors'].append(f"Contact {contact.id}: {error}")

        return stats

    @staticmethod
    def merge_contacts(primary: Contact, secondary: Contact) -> Tuple[bool, Optional[str]]:
        """
        Merge two contacts, maintaining the primary contact's core information
        while merging their identities.
        """
        if not primary.identity or not secondary.identity:
            return False, "Both contacts must have identities to merge"

        try:
            with transaction.atomic():
                # Merge identities first
                merger = IdentityMergeService(primary.identity, secondary.identity)
                success, error = merger.merge()
                if not success:
                    return False, f"Identity merge failed: {error}"

                # Update secondary contact to point to primary's identity
                secondary.identity = primary.identity
                secondary.is_active = False
                secondary.save(update_fields=['identity', 'is_active'])

                return True, None

        except Exception as e:
            return False, str(e)
