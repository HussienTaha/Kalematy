import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Button from './ui/Button'

function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6 dark:border-slate-700 dark:bg-slate-900/90">
      <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">كلماتي</h1>
      <nav className="flex items-center gap-2 sm:gap-4">
        <NavLink
          to="/dashboard"
          className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline dark:text-slate-300 dark:hover:text-slate-100"
        >
          لوحة التحكم
        </NavLink>
        <NavLink
          to="/profile"
          className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline dark:text-slate-300 dark:hover:text-slate-100"
        >
          الملف الشخصي
        </NavLink>
        <span className="hidden text-sm text-slate-500 md:inline dark:text-slate-400">
          {user?.name ?? 'متعلم'}
        </span>
        <Button type="button" variant="secondary" onClick={toggleTheme} className="px-3 py-1">
          {theme === 'dark' ? 'فاتح' : 'داكن'}
        </Button>
        <Button type="button" variant="secondary" onClick={handleLogout} className="px-3 py-1">
          تسجيل الخروج
        </Button>
      </nav>
    </header>
  )
}

export default Navbar
