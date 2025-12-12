// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useAuth() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch('/api/logout', { method: 'POST' });
    },
    onSuccess: () => {
      // 1. Clear the React Query cache instantly
      queryClient.setQueryData(['auth'], null); 
      // 2. Force a refetch to be sure (optional)
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  return {
    authData: authQuery.data,
    isLoading: authQuery.isLoading,
    isAuthenticated: authQuery.data?.authenticated == true,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    error: authQuery.error,
  };
}