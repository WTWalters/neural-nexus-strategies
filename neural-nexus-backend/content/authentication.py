"""Token authentication for n8n integration"""
import os
from rest_framework.authentication import TokenAuthentication as BaseTokenAuthentication
from rest_framework.exceptions import AuthenticationFailed


class N8NTokenAuthentication(BaseTokenAuthentication):
    """Custom token authentication for n8n webhooks"""
    keyword = 'N8N-Token'
    
    def authenticate_credentials(self, key):
        # Get tokens from environment variables
        valid_tokens = os.getenv('N8N_TOKENS', 'dev-token-123,test-token-456').split(',')
        valid_tokens = [token.strip() for token in valid_tokens if token.strip()]
        
        if not valid_tokens:
            raise AuthenticationFailed('N8N tokens not configured.')
        
        if key not in valid_tokens:
            raise AuthenticationFailed('Invalid n8n token.')
        
        # Return a tuple of (user, token) - for n8n we can return None for user
        return (None, key)
