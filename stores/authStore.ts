'use client';

import { create } from 'zustand';
import { UserProfile } from '@/types';
import { createClient } from '@/lib/supabase/client';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Check for profile in users table
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        set({ user: profile as UserProfile, loading: false });
      } else {
        // Create profile
        const newProfile: UserProfile = {
          id: user.id,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
        };
        await supabase.from('users').insert(newProfile);
        set({ user: newProfile, loading: false });
      }
    } else {
      set({ user: null, loading: false });
    }
  },

  signOut: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
