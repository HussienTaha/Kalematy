import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import Input from '../components/ui/Input'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useWords } from '../context/WordsContext'
import type { WordItem } from '../utils/types'

interface EditDraft {
  word: string
  meaning: string
  example: string
  status: WordItem['status']
}

function DashboardPage() {
  const { words, deleteWord, editWord, isHydrated } = useWords()
  const [editingWordId, setEditingWordId] = useState<string | null>(null)
  const [draft, setDraft] = useState<EditDraft>({
    word: '',
    meaning: '',
    example: '',
    status: 'medium',
  })

  const counts = useMemo(
    () => ({
      easy: words.filter((item) => item.status === 'easy').length,
      medium: words.filter((item) => item.status === 'medium').length,
      hard: words.filter((item) => item.status === 'hard').length,
    }),
    [words],
  )

  const startEdit = (item: WordItem) => {
    setEditingWordId(item.id)
    setDraft({
      word: item.word,
      meaning: item.meaning,
      example: item.example,
      status: item.status,
    })
  }

  const submitEdit = (event: FormEvent) => {
    event.preventDefault()
    if (!editingWordId) return
    if (!draft.word.trim() || !draft.meaning.trim() || !draft.example.trim()) return

    editWord(editingWordId, {
      word: draft.word.trim(),
      meaning: draft.meaning.trim(),
      example: draft.example.trim(),
      status: draft.status,
    })
    setEditingWordId(null)
  }

  return (
    <section>
      <PageHeader title="لوحة التحكم" subtitle="إدارة قائمة المفردات الخاصة بك." />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="text-slate-700 dark:text-slate-200">سهل: {counts.easy}</Card>
        <Card className="text-slate-700 dark:text-slate-200">متوسط: {counts.medium}</Card>
        <Card className="text-slate-700 dark:text-slate-200">صعب: {counts.hard}</Card>
      </div>

      {!isHydrated ? (
        <Card className="p-8 text-slate-500 dark:text-slate-400">
          <LoadingSpinner label="جارٍ تحميل الكلمات..." />
        </Card>
      ) : words.length === 0 ? (
        <EmptyState
          title="لا توجد كلمات بعد"
          description="أضف أول مفردة من صفحة إضافة كلمة لتبدأ بتتبع التقدم."
        />
      ) : (
        <div className="space-y-3">
          {words.map((item) => (
            <Card key={item.id}>
              {editingWordId === item.id ? (
                <form onSubmit={submitEdit} className="space-y-3">
                  <Input
                    label="الكلمة"
                    value={draft.word}
                    onChange={(event) => setDraft((prev) => ({ ...prev, word: event.target.value }))}
                  />
                  <Input
                    label="المعنى"
                    value={draft.meaning}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, meaning: event.target.value }))
                    }
                  />
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">مثال</span>
                    <textarea
                      value={draft.example}
                      onChange={(event) =>
                        setDraft((prev) => ({ ...prev, example: event.target.value }))
                      }
                      className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </label>
                  <select
                    value={draft.status}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, status: event.target.value as WordItem['status'] }))
                    }
                    className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="easy">سهل</option>
                    <option value="medium">متوسط</option>
                    <option value="hard">صعب</option>
                  </select>
                  <div className="flex flex-wrap gap-2">
                    <Button type="submit">
                      حفظ
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setEditingWordId(null)}
                      variant="secondary"
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{item.word}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-700 dark:text-slate-300">{item.meaning}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.example}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button type="button" onClick={() => startEdit(item)} variant="secondary">
                      تعديل
                    </Button>
                    <Button type="button" onClick={() => deleteWord(item.id)} variant="danger">
                      حذف
                    </Button>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

export default DashboardPage
