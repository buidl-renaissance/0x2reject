import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { supabase } from '@/lib/supabase';

export type AppUser = {
  id: string;
  renaissanceId?: string | null;
  username?: string | null;
  displayName?: string | null;
  pfpUrl?: string | null;
  slug?: string | null;
  vibe?: string | null;
  activities?: string[];
  isPublic?: boolean;
  photoUrl?: string | null;
  profileComplete?: boolean;
};

interface UserContextType {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  setUser: (user: AppUser | null) => void;
  signOut: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (updatedUser: Partial<AppUser>) => void;
  authHeaders: () => HeadersInit;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = '0x2reject_user';
const TOKEN_STORAGE_KEY = '0x2reject_access_token';

interface RenaissanceContext {
  isAuthenticated?: boolean;
  renaissanceUserId?: number;
  fid?: number;
  user?: {
    username?: string;
    displayName?: string;
    pfpUrl?: string;
    publicAddress?: string;
    renaissanceUserId?: number;
    fid?: number;
  };
}

declare global {
  interface Window {
    RenaissanceContext?: RenaissanceContext;
    renaissanceContext?: RenaissanceContext;
    __RENAISSANCE_CONTEXT__?: RenaissanceContext;
    __renaissanceAuthContext?: RenaissanceContext;
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    setRenaissanceContext?: (ctx: RenaissanceContext) => void;
  }
}

let contextCallback: ((ctx: RenaissanceContext) => void) | null = null;

if (typeof window !== 'undefined') {
  window.setRenaissanceContext = (ctx: RenaissanceContext) => {
    window.RenaissanceContext = ctx;
    if (contextCallback) contextCallback(ctx);
  };
}

const getRenaissanceContext = (): RenaissanceContext | null => {
  if (typeof window === 'undefined') return null;

  try {
    const ctx =
      window.__renaissanceAuthContext ||
      window.RenaissanceContext ||
      window.renaissanceContext ||
      window.__RENAISSANCE_CONTEXT__;

    if (ctx) {
      const userId = ctx.renaissanceUserId || ctx.user?.renaissanceUserId;
      if (userId) {
        return { ...ctx, isAuthenticated: true, renaissanceUserId: userId };
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const renaissanceUserId = urlParams.get('renaissanceUserId');
    if (renaissanceUserId) {
      return {
        isAuthenticated: true,
        renaissanceUserId: parseInt(renaissanceUserId, 10),
        user: {
          username: urlParams.get('username') || undefined,
          displayName: urlParams.get('displayName') || undefined,
          pfpUrl: urlParams.get('pfpUrl') || undefined,
          publicAddress: urlParams.get('publicAddress') || undefined,
        },
      };
    }

    return null;
  } catch {
    return null;
  }
};

const getStoredUser = (): AppUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

const storeUser = (user: AppUser | null) => {
  if (typeof window === 'undefined') return;
  try {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

const storeToken = (token: string | null) => {
  if (typeof window === 'undefined') return;
  try {
    if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token);
    else localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(() => getStoredUser());
  const [accessToken, setAccessToken] = useState<string | null>(() => getStoredToken());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authAttemptedRef = useRef(false);
  const userRef = useRef<AppUser | null>(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    storeUser(user);
  }, [user]);

  useEffect(() => {
    storeToken(accessToken);
  }, [accessToken]);

  const authHeaders = useCallback((): HeadersInit => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
  }, [accessToken]);

  const signOut = useCallback(async () => {
    setUser(null);
    setAccessToken(null);
    storeUser(null);
    storeToken(null);
    authAttemptedRef.current = false;
    await supabase.auth.signOut().catch(() => undefined);
    if (accessToken) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      }).catch(() => undefined);
    }
  }, [accessToken]);

  const refreshUser = useCallback(async () => {
    const token = accessToken || getStoredToken();
    if (!token) return;
    try {
      const response = await fetch('/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user) setUser(data.user);
      }
    } catch (err) {
      console.error('❌ Error refreshing user:', err);
    }
  }, [accessToken]);

  const updateUser = useCallback((updatedUser: Partial<AppUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  }, []);

  const authenticateFromContext = useCallback(
    async (ctx: RenaissanceContext): Promise<AppUser | null> => {
      const renaissanceUserId = ctx.renaissanceUserId || ctx.user?.renaissanceUserId;
      if (!renaissanceUserId) return null;

      try {
        console.log('🔐 Authenticating from Renaissance context:', renaissanceUserId);

        const response = await fetch('/api/auth/context', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            renaissanceUserId,
            user: ctx.user,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ Context auth failed:', response.status, errorData);
          return null;
        }

        const data = await response.json();
        if (data.success && data.user && data.access_token) {
          setAccessToken(data.access_token);
          await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
          });
          console.log('✅ Authenticated from context:', data.user);
          return data.user;
        }
        return null;
      } catch (err) {
        console.error('❌ Error authenticating from context:', err);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const renaissanceCtx = getRenaissanceContext();
        if (renaissanceCtx && !authAttemptedRef.current) {
          authAttemptedRef.current = true;
          const contextUser = await authenticateFromContext(renaissanceCtx);
          if (contextUser && mounted) {
            setUser(contextUser);
            setIsLoading(false);
            return;
          }
        }

        // Existing Supabase session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const token = session?.access_token || getStoredToken();
        if (token) {
          setAccessToken(token);
          const response = await fetch('/api/user/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.user && mounted) {
              setUser(data.user);
              setIsLoading(false);
              return;
            }
          }
        }

        const retryCtx = getRenaissanceContext();
        if (retryCtx && mounted) {
          const contextUser = await authenticateFromContext(retryCtx);
          if (contextUser && mounted) {
            setUser(contextUser);
            setIsLoading(false);
            return;
          }
        }

        if (mounted && getStoredUser()) {
          setUser(null);
          storeUser(null);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
          setUser(null);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchUser();

    const handleMessage = async (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if (data?.type === 'RENAISSANCE_CONTEXT' && data?.context) {
          const contextUser = await authenticateFromContext(data.context);
          if (contextUser) setUser(contextUser);
        }

        if (data?.type === 'farcaster:context:ready' && data?.context) {
          const ctx: RenaissanceContext = {
            isAuthenticated: data.authenticated || true,
            renaissanceUserId:
              data.context?.renaissanceUserId || data.context?.user?.renaissanceUserId,
            user: data.context?.user,
          };
          const contextUser = await authenticateFromContext(ctx);
          if (contextUser) setUser(contextUser);
        }

        if (data?.renaissanceUserId || data?.user?.renaissanceUserId) {
          const contextUser = await authenticateFromContext(data as RenaissanceContext);
          if (contextUser) setUser(contextUser);
        }
      } catch {
        /* ignore */
      }
    };

    window.addEventListener('message', handleMessage);

    const handleFarcasterContextReady = async (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.user?.renaissanceUserId || detail?.renaissanceUserId) {
        const ctx: RenaissanceContext = {
          isAuthenticated: true,
          renaissanceUserId: detail.renaissanceUserId || detail.user?.renaissanceUserId,
          user: detail.user,
        };
        const contextUser = await authenticateFromContext(ctx);
        if (contextUser) setUser(contextUser);
      }
    };
    window.addEventListener('farcaster:context:ready', handleFarcasterContextReady);

    const handleFarcasterContextUpdated = async (event: Event) => {
      const detail = (event as CustomEvent).detail;
      const context = detail?.context;
      if (context?.user?.renaissanceUserId || context?.renaissanceUserId) {
        const ctx: RenaissanceContext = {
          isAuthenticated: detail.authenticated || true,
          renaissanceUserId: context.renaissanceUserId || context.user?.renaissanceUserId,
          user: context.user,
        };
        const contextUser = await authenticateFromContext(ctx);
        if (contextUser) setUser(contextUser);
      }
    };
    window.addEventListener('farcaster:context:updated', handleFarcasterContextUpdated);

    contextCallback = async (ctx: RenaissanceContext) => {
      const contextUser = await authenticateFromContext(ctx);
      if (contextUser) setUser(contextUser);
    };

    let checkCount = 0;
    const checkInterval = setInterval(async () => {
      checkCount++;
      if (checkCount >= 10 || authAttemptedRef.current || userRef.current) {
        clearInterval(checkInterval);
        return;
      }
      const ctx = getRenaissanceContext();
      if (ctx && !authAttemptedRef.current) {
        authAttemptedRef.current = true;
        clearInterval(checkInterval);
        const contextUser = await authenticateFromContext(ctx);
        if (contextUser) setUser(contextUser);
      }
    }, 500);

    return () => {
      mounted = false;
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('farcaster:context:ready', handleFarcasterContextReady);
      window.removeEventListener('farcaster:context:updated', handleFarcasterContextUpdated);
      contextCallback = null;
      clearInterval(checkInterval);
    };
  }, [authenticateFromContext]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        accessToken,
        setUser,
        signOut,
        refreshUser,
        updateUser,
        authHeaders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
