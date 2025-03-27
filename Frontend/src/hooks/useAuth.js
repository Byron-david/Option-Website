// src/hooks/useAuth.js
import { useQuery, useMutation } from '@tanstack/react-query';

export function useAuth() {
  const authQuery = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await fetch('/api/auth', { credentials: 'include' });
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    },
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Login failed');
      return res.json();
    },
  });

  return {
    authData: authQuery.data,
    isLoading: authQuery.isLoading,
    isAuthenticated: authQuery.data?.authenticated,
    login: loginMutation.mutateAsync,
    error: authQuery.error,
  };
}