import { supabase } from "../services/supabase";

export const authApi = {
  getUser: async () => {
    return supabase.auth.getUser();
  },
  signInWithPassword: async ({ email, password }) => {
    return supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return supabase.auth.signOut();
  },
};
