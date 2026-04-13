import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Input from '../components/ui/Input'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useWords } from '../context/WordsContext'
import type { WordStatus } from '../utils/types'

function AddWordPage() {
  const navigate = useNavigate()
  const { addWord, words, isHydrated } = useWords()
  const [word, setWord] = useState('')
  const [meaning, setMeaning] = useState('')
  const [example, setExample] = useState('')
  const [status, setStatus] = useState<WordStatus>('medium')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!word.trim() || !meaning.trim() || !example.trim()) {
      setError('يرجى تعبئة جميع الحقول قبل إضافة كلمة.')
      return
    }

    addWord({
      word: word.trim(),
      meaning: meaning.trim(),
      example: example.trim(),
      status,
    })

    setIsSaving(true)
    navigate('/dashboard')
  }

  return (
    <section>
      <PageHeader title="إضافة كلمة" subtitle="أضف مفردة جديدة مع مثال والحالة." />
      <Card className="max-w-2xl p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="الكلمة"
            type="text"
            value={word}
            onChange={(event) => setWord(event.target.value)}
            placeholder="مثال: مرن"
          />
          <Input
            label="المعنى"
            type="text"
            value={meaning}
            onChange={(event) => setMeaning(event.target.value)}
            placeholder="مثال: قادر على التعافي سريعاً من الصعوبات"
          />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">مثال</span>
            <textarea
              value={example}
              onChange={(event) => setExample(event.target.value)}
              rows={3}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              placeholder="مثال: ظل مرناً بعد الانتكاسة."
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">الحالة</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as WordStatus)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="easy">سهل</option>
              <option value="medium">متوسط</option>
              <option value="hard">صعب</option>
            </select>
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full sm:w-auto">
            {isSaving ? <LoadingSpinner label="جارٍ الحفظ..." /> : 'إضافة كلمة'}
          </Button>
        </form>
      </Card>
      <div className="mt-6 max-w-2xl">
        {!isHydrated ? (
          <Card className="p-6 text-slate-500 dark:text-slate-400">
            <LoadingSpinner label="جارٍ تحميل إحصائيات الكلمات..." />
          </Card>
        ) : words.length === 0 ? (
          <EmptyState
            title="لا توجد كلمات محفوظة بعد"
            description="هذا وقت مناسب لإضافة أول كلمة وبدء رحلة المراجعة."
          />
        ) : (
          <Card className="p-5 text-sm text-slate-600 dark:text-slate-300">
            لديك حالياً <span className="font-semibold">{words.length}</span> كلمة محفوظة.
          </Card>
        )}
      </div>
    </section>
  )
}

export default AddWordPage
