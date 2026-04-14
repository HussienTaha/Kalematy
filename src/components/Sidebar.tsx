import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'لوحة التحكم' },
  { to: '/add-word', label: 'إضافة كلمة' },
  { to: '/review', label: 'المراجعة' },
  { to: '/profile', label: 'الملف الشخصي' },
]

function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 md:w-64 md:border-b-0 md:border-r  ">
      <nav className="flex flex-row gap-3 overflow-x-auto md:flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition duration-200 ${
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
