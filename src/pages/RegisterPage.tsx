import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('يرجى إكمال جميع الحقول.')
      return
    }

    setError('')
    setIsSubmitting(true)
    await register(name, email, password)
    setIsSubmitting(false)
    navigate('/dashboard', { replace: true })
  }

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
      <PageHeader title="إنشاء حساب" subtitle="أنشئ ملف المتعلم الخاص بك." />
      <Card className="p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="الاسم"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="متعلم"
          />
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
            {isSubmitting ? <LoadingSpinner label="جارٍ إنشاء الحساب..." /> : 'إنشاء حساب'}
          </Button>
        </form>
      </Card>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        لديك حساب بالفعل؟{' '}
        <Link className="font-medium text-indigo-600 hover:text-indigo-700" to="/login">
          تسجيل الدخول
        </Link>
      </p>
    </section>
  )
}

export default RegisterPage
