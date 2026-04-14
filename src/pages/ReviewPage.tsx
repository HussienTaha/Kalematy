import { useEffect, useMemo, useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useWords } from '../context/WordsContext'
import type { WordStatus } from '../utils/types'

function ReviewPage() {
  const { words, editWord, isHydrated } = useWords()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reviewedIds, setReviewedIds] = useState<string[]>([])

  const hasWords = words.length > 0
  const currentWord = useMemo(() => words[currentIndex], [words, currentIndex])
  const reviewedCount = reviewedIds.length
  const progressPercent = words.length ? (reviewedCount / words.length) * 100 : 0

  useEffect(() => {
    if (!words.length) {
      setCurrentIndex(0)
      return
    }
    if (currentIndex >= words.length) {
      setCurrentIndex(0)
    }
  }, [currentIndex, words.length])

  const goToNext = () => {
    if (!hasWords) return
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % words.length)
  }

  const markWordStatus = (status: WordStatus) => {
    if (!currentWord) return

    editWord(currentWord.id, {
      word: currentWord.word,
      meaning: currentWord.meaning,
      example: currentWord.example,
      status,
    })

    setReviewedIds((prev) => (prev.includes(currentWord.id) ? prev : [...prev, currentWord.id]))
    goToNext()
  }

  return (
    <section>
      <PageHeader title="المراجعة" subtitle="راجع الكلمات كبطاقات تعليمية وتابع تقدمك." />

      {!isHydrated ? (
        <Card className="p-8 text-slate-500 ">
          <LoadingSpinner label="جارٍ تجهيز بطاقات المراجعة..." />
        </Card>
      ) : !hasWords ? (
        <EmptyState
          title="لا توجد كلمات للمراجعة"
          description="أضف مفردات أولاً، ثم عد للتدرب باستخدام البطاقات التعليمية."
        />
      ) : (
        <div className="mx-auto w-full max-w-3xl space-y-4">
          <Card className="p-4 sm:p-5">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600 ">
              <span>
                التقدم: {reviewedCount}/{words.length}
              </span>
              <span>
                البطاقة {currentIndex + 1}/{words.length}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 ">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </Card>

          <div className="h-72 w-full [perspective:1200px] sm:h-80">
            <button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              className="h-full w-full text-right"
              aria-label="اقلب البطاقة التعليمية"
            >
              <div
                className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                <Card className="absolute inset-0 flex h-full w-full items-center justify-center rounded-2xl border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 [backface-visibility:hidden]   ">
                  <div className="text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wide text-indigo-600">
                      الأمام
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl ">{currentWord.word}</h3>
                    <p className="mt-4 text-sm text-slate-500 ">اضغط على البطاقة لقلبها</p>
                  </div>
                </Card>

                <Card className="absolute inset-0 flex h-full w-full rounded-2xl border-slate-200 bg-white p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="my-auto w-full text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500 ">الخلف</p>
                    <p className="text-xl font-semibold text-slate-900 sm:text-2xl ">{currentWord.meaning}</p>
                    <p className="mt-4 text-sm text-slate-600 sm:text-base ">{currentWord.example}</p>
                  </div>
                </Card>
              </div>
            </button>
          </div>

          <Card className="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-500 ">الحالة الحالية: {currentWord.status}</span>
              <Button type="button" variant="secondary" onClick={goToNext}>
                تخطي
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Button type="button" variant="secondary" onClick={() => markWordStatus('easy')}>
                سهل
              </Button>
              <Button type="button" variant="primary" onClick={() => markWordStatus('medium')}>
                متوسط
              </Button>
              <Button type="button" variant="danger" onClick={() => markWordStatus('hard')}>
                صعب
              </Button>
            </div>
          </Card>
        </div>
      )}
    </section>
  )
}

export default ReviewPage
