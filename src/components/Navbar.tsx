import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from './ui/Button'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6  ">
      <h1 className="text-lg font-semibold text-slate-800 ">كلماتي</h1>
      <nav className="flex items-center gap-2 sm:gap-4">
        <NavLink
          to="/dashboard"
          className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline  "
        >
          لوحة التحكم
        </NavLink>
        <NavLink
          to="/profile"
          className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:inline  "
        >
          الملف الشخصي
        </NavLink>
        <span className="hidden text-sm text-slate-500 md:inline ">
          {user?.name ?? 'متعلم'}
        </span>
        <Button type="button" variant="secondary" onClick={handleLogout} className="px-3 py-1">
          تسجيل الخروج
        </Button>
      </nav>
    </header>
  )
}

export default Navbar
