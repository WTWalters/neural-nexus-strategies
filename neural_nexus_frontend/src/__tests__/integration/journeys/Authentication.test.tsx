import { render, screen, waitFor } from '@/tests/test-utils';
import { AuthProvider } from '@/contexts/AuthContext';
import { LoginPage } from '@/app/login/page';
import { rest } from 'msw';
import { server } from '@/mocks/server';

describe('Authentication Journey', () => {
  it('completes the login flow successfully', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(
          ctx.json({
            token: 'fake-jwt-token',
            user: {
              id: 1,
              email: 'test@example.com',
              name: 'Test User'
            }
          })
        );
      })
    );

    const { user } = render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBeTruthy();
    });
  });
});