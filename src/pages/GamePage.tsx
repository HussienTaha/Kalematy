import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import SafeImage from '../components/ui/SafeImage'
import Button from '../components/ui/Button'
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

function GamePage() {
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
  
  const MAX_ATTEMPTS = 10
  const isGameOver = attempts >= MAX_ATTEMPTS

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
    if (!round || isGameOver) return
    if (feedback === 'correct') return

    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setSelectedId(picked.id)

    if (picked.id === round.correct.id) {
      setScore((prev) => prev + 1)
      setFeedback('correct')
      if (newAttempts < MAX_ATTEMPTS) {
        window.setTimeout(() => startNewRound(), 650)
      }
      return
    }

    setFeedback('wrong')
  }

  const resetGame = () => {
    setScore(0)
    setAttempts(0)
    startNewRound()
  }

  if (pool.length < 3) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50 px-4 py-10 sm:py-12  ">
        <div className="mx-auto max-w-4xl">
          <PageHeader title="لعبة" subtitle="لا توجد كلمات عربية كافية لبدء اللعبة." />
          <Card className="text-slate-700 ">
            أضف المزيد من الكلمات العربية في بيانات الفئات ثم جرّب مرة أخرى.
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50 px-4 py-10 sm:py-12  ">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-white  "
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

        <PageHeader title="لعبة: اسمع واختر" subtitle={isGameOver ? "انتهت اللعبة! 🎉" : "اضغط على الكلمة لسماعها ثم اختر الصورة الصحيحة."} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr,360px]">
          <Card className="p-5 sm:p-6">
            {isGameOver ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉👏🔥</div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">عمل رائع!</h3>
                <p className="text-xl text-slate-600 mb-6">لقد أكملت 10 محاولات بنتيجة {score} من 10.</p>
                <Button onClick={resetGame} className="rounded-full px-8 py-4 text-lg">
                  العب مرة أخرى 🔄
                </Button>
              </div>
            ) : !round ? (
              <div className="text-slate-700 ">جارٍ تجهيز الجولة...</div>
            ) : (
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={() => speak(round.correct.nameAr)}
                  className="flex w-full items-center justify-between gap-3 rounded-3xl border border-white/30 bg-white/70 px-5 py-4 text-slate-900 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300   "
                  aria-label={`سماع كلمة ${round.correct.nameAr}`}
                >
                  <span className="text-3xl font-black tracking-wide sm:text-4xl">{round.correct.nameAr}</span>
                  <span className="text-2xl" aria-hidden="true">
                    🔊
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {round.options.map((option) => {
                    const isPicked = selectedId === option.id
                    const isCorrect = feedback === 'correct' && option.id === round.correct.id
                    const isWrongPicked = feedback === 'wrong' && isPicked && option.id !== round.correct.id

                    const ringClass = isCorrect
                      ? 'ring-4 ring-emerald-400 ring-offset-2 ring-offset-white/60 '
                      : isWrongPicked
                        ? 'ring-4 ring-red-400 ring-offset-2 ring-offset-white/60 '
                        : 'hover:ring-4 hover:ring-indigo-300 hover:ring-offset-2 hover:ring-offset-white/60 '

                    return (
                      <button
                        key={option.id}
                        type="button"
                        disabled={isGameOver}
                        onClick={() => handlePick(option)}
                        className={`group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/30 bg-white/60 shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300   ${ringClass}`}
                        aria-label={`اختيار ${option.nameAr}`}
                      >
                        <SafeImage
                          src={option.image}
                          alt={option.nameAr}
                          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      </button>
                    )
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-700 ">
                    النتيجة: {score} / {MAX_ATTEMPTS}
                  </div>
                  <div className="text-sm font-semibold text-indigo-600">
                    المحاولات المتبقية: {MAX_ATTEMPTS - attempts}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={startNewRound}
                      className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50   "
                      aria-label="تخطي الجولة"
                    >
                      تخطي
                    </button>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50   "
                      aria-label="إعادة بدء اللعبة"
                    >
                      إعادة
                    </button>
                  </div>
                </div>

                {feedback === 'correct' ? (
                  <div className="rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm font-bold text-emerald-800 ">
                    أحسنت! ✅
                  </div>
                ) : feedback === 'wrong' ? (
                  <div className="rounded-2xl bg-red-500/15 px-4 py-3 text-sm font-bold text-red-800 ">
                    حاول مرة أخرى.
                  </div>
                ) : (
                  <div className="rounded-2xl bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-slate-800 ">
                    تلميح: اضغط على الكلمة لسماعها.
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card className="p-5 sm:p-6">
            <h3 className="text-lg font-extrabold text-slate-900 ">كيف نلعب؟</h3>
            <p className="mt-2 text-sm text-slate-700 ">
              1) اضغط على الكلمة لسماع نطقها.
              <br />
              2) اختر الصورة التي تطابق الكلمة.
              <br />
              3) كل إجابة صحيحة تزيد نتيجتك.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default GamePage
