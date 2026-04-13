import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface AuthUser {
  id: string
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AUTH_STORAGE_KEY = 'kalematy_auth_user'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function createMockUser(name: string, email: string): AuthUser {
  return {
    id: crypto.randomUUID(),
    name,
    email,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw) as AuthUser
      setUser(parsed)
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [])

  const login = async (email: string, _password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const nextUser = createMockUser(normalizedEmail.split('@')[0] || 'Learner', normalizedEmail)
    setUser(nextUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
  }

  const register = async (name: string, email: string, _password: string) => {
    const nextUser = createMockUser(name.trim(), email.trim().toLowerCase())
    setUser(nextUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
