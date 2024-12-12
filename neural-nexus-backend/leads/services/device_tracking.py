# neural-nexus-backend/leads/services/device_tracking.py

from django.utils import timezone
from ..models import Identity, IdentityDevice

class DeviceTrackingService:
    @staticmethod
    def track_device(identity: Identity, fingerprint: str, user_agent: str = None) -> IdentityDevice:
        """
        Track a device for an identity, creating or updating the device record.

        Args:
            identity: The Identity instance to associate with
            fingerprint: The device fingerprint hash
            user_agent: Optional user agent string

        Returns:
            IdentityDevice: The created or updated device record
        """
        device, created = IdentityDevice.objects.get_or_create(
            identity=identity,
            fingerprint=fingerprint,
            defaults={
                'user_agent': user_agent,
                'first_seen_at': timezone.now()
            }
        )

        if not created and (device.user_agent != user_agent or not device.is_active):
            device.user_agent = user_agent
            device.is_active = True
            device.save(update_fields=['user_agent', 'is_active'])

        device.mark_seen()
        return device

    @staticmethod
    def merge_devices(primary_identity: Identity, secondary_identity: Identity) -> None:
        """
        Merge devices from secondary identity into primary identity during identity merge.

        Args:
            primary_identity: The identity to merge devices into
            secondary_identity: The identity to merge devices from
        """
        # Get all devices from secondary identity
        secondary_devices = IdentityDevice.objects.filter(identity=secondary_identity)

        for device in secondary_devices:
            # Check if device already exists in primary identity
            existing_device = IdentityDevice.objects.filter(
                identity=primary_identity,
                fingerprint=device.fingerprint
            ).first()

            if existing_device:
                # Update existing device if secondary device was seen more recently
                if device.last_seen_at > existing_device.last_seen_at:
                    existing_device.last_seen_at = device.last_seen_at
                    existing_device.user_agent = device.user_agent
                    existing_device.is_active = device.is_active
                    existing_device.save()
                # Delete the secondary device
                device.delete()
            else:
                # Move device to primary identity
                device.identity = primary_identity
                device.save()
