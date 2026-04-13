import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Input from '../components/ui/Input'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/dashboard'

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور.')
      return
    }

    setError('')
    setIsSubmitting(true)
    await login(email, password)
    setIsSubmitting(false)
    navigate(from, { replace: true })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
      <PageHeader title="تسجيل الدخول" subtitle="يمكنك استخدام أي بريد/كلمة مرور للتجربة." />
      <Card className="p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
          <Input
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner label="جارٍ تسجيل الدخول..." /> : 'تسجيل الدخول'}
          </Button>
        </form>
      </Card>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        ليس لديك حساب؟{' '}
        <Link className="font-medium text-indigo-600 hover:text-indigo-700" to="/register">
          إنشاء حساب
        </Link>
      </p>
      <div className="mt-8">
        <EmptyState title="تجربة تسجيل الدخول" description="التسجيل وتسجيل الدخول تجريبيان لاختبار واجهة المستخدم." />
      </div>
    </section>
  )
}

export default LoginPage
