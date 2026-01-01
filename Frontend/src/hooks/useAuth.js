// src/hooks/useAuth.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../utils/config';

export function useAuth() {
  const queryClient = useQueryClient();

  const authQuery = useQuery({
      queryKey: ['auth'],
      queryFn: async () => {
        // Wrap in try/catch to handle network errors or invalid JSON
        try {
          const res = await fetch(`${BASE_URL}/api/auth`, { credentials: 'include' });

          if (!res.ok) {
            return { authenticated: false }; 
          }
          
          return await res.json();
        } catch (error) {
          // If fetch fails (e.g., backend down), assume not logged in
          console.warn("Auth check failed, assuming logged out:", error);
          return { authenticated: false };
        }
      },
      retry: false
    });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Login failed');
      }
      
      return res.json();
    },
    onSuccess: (data) => {
      // 1. Immediately update the cache so the UI knows we are logged in
      queryClient.setQueryData(['auth'], { authenticated: true, user: data.user });
      
      // 2. Force a re-fetch to be absolutely sure (optional but safe)
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth'], { authenticated: false });
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