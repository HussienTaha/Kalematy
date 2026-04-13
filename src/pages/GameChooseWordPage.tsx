import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import SafeImage from '../components/ui/SafeImage'
import { useCategorySlider } from '../context/CategorySliderContext'
import { categories } from '../data/categories'

type GameItem = {
  id: string
  name: string
  nameAr: string
  image: string
}

type Round = {
  correct: GameItem
  options: GameItem[]
}

function shuffle<T>(items: T[]) {
  const copy = [...items]
  for (let idx = copy.length - 1; idx > 0; idx -= 1) {
    const swapIndex = Math.floor(Math.random() * (idx + 1))
    const temp = copy[idx]
    copy[idx] = copy[swapIndex]
    copy[swapIndex] = temp
  }
  return copy
}

function GameChooseWordPage() {
  const { soundEnabled, toggleSound } = useCategorySlider()

  const pool = useMemo<GameItem[]>(() => {
    return categories
      .flatMap((category) => category.items)
      .filter((item) => Boolean(item.nameAr))
      .map((item) => ({
        id: item.id,
        name: item.name,
        nameAr: item.nameAr!,
        image: item.image,
      }))
  }, [])

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [round, setRound] = useState<Round | null>(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle')

  useEffect(() => {
    const synth = window.speechSynthesis
    const loadVoices = () => {
      setVoices(synth.getVoices())
    }

    loadVoices()
    synth.addEventListener('voiceschanged', loadVoices)

    return () => {
      synth.removeEventListener('voiceschanged', loadVoices)
      synth.cancel()
    }
  }, [])

  const pickArabicVoice = () => {
    return voices.find((voice) => voice.lang.toLowerCase().startsWith('ar'))
  }

  const speak = (text: string) => {
    if (!soundEnabled) return
    if (!('speechSynthesis' in window)) return

    const synth = window.speechSynthesis
    synth.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ar-SA'
    utterance.rate = 0.85
    utterance.pitch = 1
    utterance.volume = 1

    const voice = pickArabicVoice()
    if (voice) utterance.voice = voice

    synth.speak(utterance)
  }

  const startNewRound = () => {
    if (pool.length < 3) return

    const correct = pool[Math.floor(Math.random() * pool.length)]
    const distractors = shuffle(pool.filter((item) => item.id !== correct.id)).slice(0, 2)
    const options = shuffle([correct, ...distractors])

    setRound({ correct, options })
    setSelectedId(null)
    setFeedback('idle')
  }

  useEffect(() => {
    startNewRound()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.length])

  const handlePick = (picked: GameItem) => {
    if (!round) return
    if (feedback === 'correct') return

    setAttempts((prev) => prev + 1)
    setSelectedId(picked.id)
    speak(picked.nameAr)

    if (picked.id === round.correct.id) {
      setScore((prev) => prev + 1)
      setFeedback('correct')
      window.setTimeout(() => startNewRound(), 650)
      return
    }

    setFeedback('wrong')
  }

  if (pool.length < 3) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-sky-100 to-indigo-100 px-4 py-10 sm:py-12 dark:from-slate-950 dark:to-slate-900">
        <div className="mx-auto max-w-4xl">
          <PageHeader title="لعبة" subtitle="لا توجد كلمات عربية كافية لبدء اللعبة." />
          <Card className="text-slate-700 dark:text-slate-200">
            أضف المزيد من الكلمات العربية في بيانات الفئات ثم جرّب مرة أخرى.
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-100 to-indigo-100 px-4 py-10 sm:py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-white dark:bg-slate-900/80 dark:text-slate-100"
          >
            العودة
          </Link>
          <button
            type="button"
            onClick={toggleSound}
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
            aria-label={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
          >
            {soundEnabled ? 'الصوت: يعمل' : 'الصوت: متوقف'}
          </button>
        </div>

        <PageHeader title="لعبة: انظر واختر" subtitle="انظر إلى الصورة ثم اختر الكلمة الصحيحة." />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr,360px]">
          <Card className="p-5 sm:p-6">
            {!round ? (
              <div className="text-slate-700 dark:text-slate-200">جارٍ تجهيز الجولة...</div>
            ) : (
              <div className="space-y-5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/30 bg-white/60 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
                  <SafeImage
                    src={round.correct.image}
                    alt={round.correct.nameAr}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {round.options.map((option) => {
                    const isPicked = selectedId === option.id
                    const isCorrect = feedback === 'correct' && option.id === round.correct.id
                    const isWrongPicked = feedback === 'wrong' && isPicked && option.id !== round.correct.id

                    const variantClass = isCorrect
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-100'
                      : isWrongPicked
                        ? 'border-red-300 bg-red-50 text-red-900 dark:bg-red-500/10 dark:text-red-100'
                        : 'border-white/30 bg-white/70 text-slate-900 hover:bg-white dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900/80'

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handlePick(option)}
                        className={`rounded-2xl border px-4 py-3 text-lg font-black tracking-wide shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 ${variantClass}`}
                        aria-label={`اختيار كلمة ${option.nameAr}`}
                      >
                        {option.nameAr}
                      </button>
                    )
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    النتيجة: {score} / {Math.max(attempts, 1)}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={startNewRound}
                      className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                      aria-label="تخطي الجولة"
                    >
                      تخطي
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setScore(0)
                        setAttempts(0)
                        startNewRound()
                      }}
                      className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                      aria-label="إعادة بدء اللعبة"
                    >
                      إعادة
                    </button>
                  </div>
                </div>

                {feedback === 'correct' ? (
                  <div className="rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm font-bold text-emerald-800 dark:text-emerald-200">
                    أحسنت!
                  </div>
                ) : feedback === 'wrong' ? (
                  <div className="rounded-2xl bg-red-500/15 px-4 py-3 text-sm font-bold text-red-800 dark:text-red-200">
                    حاول مرة أخرى.
                  </div>
                ) : (
                  <div className="rounded-2xl bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    اختر الكلمة التي تطابق الصورة.
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card className="p-5 sm:p-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">كيف نلعب؟</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              1) انظر إلى الصورة.
              <br />
              2) اضغط على الكلمة الصحيحة.
              <br />
              3) يمكنك سماع الكلمة عند اختيارها.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default GameChooseWordPage
