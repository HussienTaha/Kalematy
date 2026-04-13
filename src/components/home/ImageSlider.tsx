import type { TouchEvent } from 'react'
import type { CategoryItem } from '../../data/categories'
import SafeImage from '../ui/SafeImage'

interface ImageSliderProps {
  items: CategoryItem['items']
  currentIndex: number
  onSelectIndex: (index: number) => void
  image: string
  name: string
  nameAr?: string
  index: number
  total: number
  isSpeaking: boolean
  onSpeak: () => void
  soundEnabled: boolean
  onToggleSound: () => void
  onPrev: () => void
  onNext: () => void
  onTouchStart: (event: TouchEvent<HTMLDivElement>) => void
  onTouchEnd: (event: TouchEvent<HTMLDivElement>) => void
}

function ImageSlider({
  items,
  currentIndex,
  onSelectIndex,
  image,
  name,
  nameAr,
  index,
  total,
  isSpeaking,
  onSpeak,
  soundEnabled,
  onToggleSound,
  onPrev,
  onNext,
  onTouchStart,
  onTouchEnd,
}: ImageSliderProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-3xl bg-slate-900/90 p-8 text-white">
        لا توجد صور متاحة.
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div
        className={`relative mx-auto flex w-full min-h-[320px] flex-[1.35] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300 sm:min-h-[420px] md:min-h-[480px] ${
          isSpeaking ? 'ring-4 ring-emerald-300 ring-offset-2 ring-offset-slate-900 shadow-emerald-300/20' : ''
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <button
          type="button"
          onClick={onToggleSound}
          className="absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-lg text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/45"
          aria-label={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
          title={soundEnabled ? 'الصوت يعمل' : 'الصوت متوقف'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button
          type="button"
          onClick={onSpeak}
          className="flex h-full w-full items-center justify-center p-3 sm:p-5"
          aria-label={`نطق ${nameAr || name}`}
        >
          <SafeImage
            src={image}
            alt={name}
            className={`h-full w-full rounded-[24px] object-contain object-center shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition duration-500 ${
              isSpeaking ? 'scale-[1.02] brightness-110' : 'scale-100'
            }`}
            style={{ animation: 'slidePulseIn 280ms ease-out' }}
          />
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-3 pb-2 pt-6">
          <p className="text-center text-[11px] font-bold tracking-wide text-slate-100">اضغط على الصورة لسماع النطق</p>
        </div>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 shadow-[0_8px_22px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="min-h-11 min-w-11 rounded-full border border-white/20 bg-white/10 px-3 text-lg font-bold text-white transition hover:bg-white/20"
            aria-label="الشريحة التالية"
          >
            ▶
          </button>
          <p className={`flex-1 truncate text-center text-5xl font-extrabold text-white transition ${isSpeaking ? 'animate-pulse' : ''}`}>
            {index}/{total} - {nameAr || name}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="min-h-11 min-w-11 rounded-full border border-white/20 bg-white/10 px-3 text-lg font-bold text-white transition hover:bg-white/20"
            aria-label="الشريحة السابقة"
          >
            ◀
          </button>
        </div>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`group relative aspect-[4/3] w-32 shrink-0 snap-start overflow-hidden rounded-2xl border-2 transition duration-300 sm:w-36 ${
              idx === currentIndex
                ? 'scale-[1.04] border-emerald-300 shadow-[0_0_0_3px_rgba(52,211,153,0.25),0_10px_24px_rgba(16,185,129,0.25)]'
                : 'border-white/15 opacity-90 hover:scale-[1.03] hover:border-white/45 hover:opacity-100'
            }`}
            aria-label={`اختيار ${item.nameAr || item.name}`}
          >
            <SafeImage src={item.image} alt={item.name} className="h-full w-full object-cover object-center transition duration-300 group-hover:brightness-110" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-1.5 pb-1 pt-3">
              <p className="truncate text-center text-[9px] font-bold text-white">{item.nameAr || item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
