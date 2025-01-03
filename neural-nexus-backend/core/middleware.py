# core/middleware.py


class HealthCheckMiddlewareDisabler:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/health"):
            # Bypass all security middleware for health checks
            return self.get_response(request)
        return self.get_response(request)
