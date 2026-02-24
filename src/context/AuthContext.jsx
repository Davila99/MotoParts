import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: authError } = await authApi.getUser();

    if (authError) {
      setError(authError);
      setUser(null);
    } else {
      setUser(data?.user ?? null);
    }

    setLoading(false);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);

    const { data, error: authError } = await authApi.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError);
      setLoading(false);
      return { user: null, error: authError };
    }

    setUser(data?.user ?? null);
    setLoading(false);

    return { user: data?.user ?? null, error: null };
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { error: authError } = await authApi.signOut();

    if (authError) {
      setError(authError);
    } else {
      setUser(null);
    }

    setLoading(false);
    return { error: authError ?? null };
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      refreshUser: loadUser,
      signIn,
      signOut,
    }),
    [user, loading, error, loadUser, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
