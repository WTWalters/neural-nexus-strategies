import pytest
from django.core.exceptions import ValidationError
from leads.models import Identity

@pytest.mark.django_db
class TestIdentityModel:
    def test_create_anonymous_identity(self):
        """Test creating an anonymous identity"""
        anon_id = "anon_123"
        identity = Identity.objects.create_anonymous(anonymous_id=anon_id)
        assert identity.is_anonymous is True
        assert identity.anonymous_id == anon_id

    def test_create_known_identity(self):
        """Test creating a known identity with email"""
        email = "test@example.com"
        identity, created = Identity.objects.get_or_create_from_email(email)
        assert created is True
        assert identity.is_anonymous is False
        assert identity.primary_email == email

    def test_convert_anonymous_to_known(self):
        """Test converting anonymous identity to known"""
        identity = Identity.objects.create_anonymous("anon_123")
        identity.convert_to_known("test@example.com", "contact_form")
        assert identity.is_anonymous is False
        assert identity.primary_email == "test@example.com"

    def test_consent_management(self):
        """Test consent update functionality"""
        identity = Identity.objects.create_anonymous("anon_123")
        identity.update_consent(marketing=False, analytics=True)
        assert identity.marketing_consent is False
        assert identity.analytics_consent is True
        assert identity.consent_updated_at is not None

    def test_validation_requirements(self):
        """Test model validation requirements"""
        with pytest.raises(ValidationError):
            Identity.objects.create()  # No anonymous_id or email

    def test_session_tracking(self):
        """Test session update functionality"""
        identity = Identity.objects.create_anonymous("anon_123")
        identity.update_session(
            "session_123",
            ip_address="127.0.0.1",
            user_agent="Mozilla/5.0"
        )
        assert identity.current_session_id == "session_123"
        assert identity.last_ip_address == "127.0.0.1"
