import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function AppLayout() {
  return (
    <div className="min-h-screen bg-background-light text-slate-700 transition-colors  ">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="mx-auto w-full max-w-6xl flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
