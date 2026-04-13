import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useAuth } from '../context/AuthContext'
import { useWords } from '../context/WordsContext'

function ProfilePage() {
  const { user } = useAuth()
  const { words, isHydrated } = useWords()

  return (
    <section>
      <PageHeader title="الملف الشخصي" subtitle="نظرة عامة على الحساب وتقدم المفردات." />
      {!isHydrated ? (
        <Card className="max-w-xl p-8 text-slate-500 dark:text-slate-400">
          <LoadingSpinner label="جارٍ تحميل الملف الشخصي..." />
        </Card>
      ) : !user ? (
        <EmptyState title="لا يوجد مستخدم نشط" description="سجّل الدخول لعرض بيانات ملفك وتقدمك." />
      ) : (
        <Card className="max-w-xl space-y-3 p-5 sm:p-6">
        <p>
            <span className="font-semibold text-slate-800 dark:text-slate-100">الاسم: </span>
            <span className="text-slate-700 dark:text-slate-300">{user.name}</span>
        </p>
        <p>
            <span className="font-semibold text-slate-800 dark:text-slate-100">البريد الإلكتروني: </span>
            <span className="text-slate-700 dark:text-slate-300">{user.email}</span>
        </p>
        <p>
            <span className="font-semibold text-slate-800 dark:text-slate-100">إجمالي الكلمات: </span>
            <span className="text-slate-700 dark:text-slate-300">{words.length}</span>
        </p>
        </Card>
      )}
    </section>
  )
}

export default ProfilePage
