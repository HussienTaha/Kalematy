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
  nameAr: string
  image: string
}

type MemoryCard =
  | {
      id: string
      pairId: string
      kind: 'image'
      image: string
      label: string
    }
  | {
      id: string
      pairId: string
      kind: 'word'
      word: string
      label: string
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

function GameMemoryPage() {
  const { soundEnabled, toggleSound } = useCategorySlider()

  const pool = useMemo<GameItem[]>(() => {
    return categories
      .flatMap((category) => category.items)
      .filter((item) => Boolean(item.nameAr))
      .map((item) => ({
        id: item.id,
        nameAr: item.nameAr!,
        image: item.image,
      }))
  }, [])

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedIds, setFlippedIds] = useState<string[]>([])
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const [busy, setBusy] = useState(false)

  const MAX_MOVES = 24
  const isWin = cards.length > 0 && matchedPairIds.length > 0 && matchedPairIds.length * 2 === cards.length
  const isGameOver = moves >= MAX_MOVES && !isWin

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

  const setup = () => {
    const pairsCount = 6
    const chosen = shuffle(pool).slice(0, Math.min(pairsCount, pool.length))

    const nextCards = shuffle(
      chosen.flatMap((item) => {
        const pairId = item.id
        return [
          {
            id: `${pairId}:image`,
            pairId,
            kind: 'image' as const,
            image: item.image,
            label: `صورة ${item.nameAr}`,
          },
          {
            id: `${pairId}:word`,
            pairId,
            kind: 'word' as const,
            word: item.nameAr,
            label: `كلمة ${item.nameAr}`,
          },
        ]
      }),
    )

    setCards(nextCards)
    setFlippedIds([])
    setMatchedPairIds([])
    setMoves(0)
    setBusy(false)
  }

  useEffect(() => {
    if (pool.length >= 3) setup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.length])

  const isMatched = (card: MemoryCard) => matchedPairIds.includes(card.pairId)
  const isFlipped = (card: MemoryCard) => flippedIds.includes(card.id) || isMatched(card)

  const onFlip = (card: MemoryCard) => {
    if (busy || isGameOver || isWin) return
    if (isMatched(card)) return
    if (flippedIds.includes(card.id)) return
    if (flippedIds.length >= 2) return

    setFlippedIds((prev) => [...prev, card.id])
    if (card.kind === 'word') speak(card.word)
  }

  useEffect(() => {
    if (flippedIds.length !== 2) return
    const [aId, bId] = flippedIds
    const a = cards.find((c) => c.id === aId)
    const b = cards.find((c) => c.id === bId)
    if (!a || !b) return

    setMoves((prev) => prev + 1)

    if (a.pairId === b.pairId) {
      setMatchedPairIds((prev) => (prev.includes(a.pairId) ? prev : [...prev, a.pairId]))
      setFlippedIds([])
      return
    }

    setBusy(true)
    const timeout = window.setTimeout(() => {
      setFlippedIds([])
      setBusy(false)
    }, 650)

    return () => window.clearTimeout(timeout)
  }, [cards, flippedIds])

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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
              aria-label={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
            >
              {soundEnabled ? 'الصوت: يعمل' : 'الصوت: متوقف'}
            </button>
            <button
              type="button"
              onClick={setup}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50   "
              aria-label="إعادة ترتيب البطاقات"
            >
              إعادة
            </button>
          </div>
        </div>

        <PageHeader title="لعبة الذاكرة" subtitle={(isWin || isGameOver) ? "انتهت اللعبة! 🎉" : "اقلب بطاقتين وحاول مطابقة الكلمة مع الصورة."} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr,360px]">
          <Card className="p-5 sm:p-6">
            {(isWin || isGameOver) ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">{isWin ? "🎉👏🔥" : "⌛💔"}</div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">
                  {isWin ? "عمل رائع!" : "انتهت المحاولات"}
                </h3>
                <p className="text-xl text-slate-600 mb-6">
                  {isWin 
                    ? `لقد وجدت جميع المطابقات في ${moves} حركة.` 
                    : `لقد نفدت الحركات! وجدت ${matchedPairIds.length} من أصل ${cards.length / 2} مطابقة.`}
                </p>
                <Button onClick={setup} className="rounded-full px-8 py-4 text-lg">
                  العب مرة أخرى 🔄
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {cards.map((card) => {
                  const flipped = isFlipped(card)
                  const matched = isMatched(card)

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => onFlip(card)}
                      className={`relative aspect-square w-full overflow-hidden rounded-3xl border shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 ${
                        matched
                          ? 'border-emerald-300 bg-emerald-50 '
                          : 'border-white/30 bg-white/60 hover:bg-white   '
                      }`}
                      aria-label={card.label}
                      disabled={busy}
                    >
                      {!flipped ? (
                        <div className="grid h-full w-full place-items-center">
                          <span className="text-3xl" aria-hidden="true">
                            ❓
                          </span>
                        </div>
                      ) : card.kind === 'image' ? (
                        <SafeImage src={card.image} alt={card.label} className="h-full w-full object-cover object-center" />
                      ) : (
                        <div className="grid h-full w-full place-items-center px-2">
                          <span className="text-center text-lg font-black text-slate-900 ">
                            {card.word}
                          </span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </Card>

          <Card className="p-5 sm:p-6">
            <h3 className="text-lg font-extrabold text-slate-900 ">الإحصائيات</h3>
            <p className="mt-2 text-sm font-semibold text-slate-700 ">الحركات: {moves} / {MAX_MOVES}</p>
            <p className="mt-1 text-sm font-semibold text-slate-700 ">
              المطابقات: {matchedPairIds.length} / {Math.floor(cards.length / 2)}
            </p>

            {isWin ? (
              <div className="mt-4 rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm font-bold text-emerald-800 ">
                ممتاز! لقد وجدت كل الصور. ✅
              </div>
            ) : isGameOver ? (
              <div className="mt-4 rounded-2xl bg-red-500/15 px-4 py-3 text-sm font-bold text-red-800 ">
                حظاً أوفر في المرة القادمة.
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-slate-800 ">
                تلميح: اقلب كلمة ثم ابحث عن صورتها.
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

export default GameMemoryPage
