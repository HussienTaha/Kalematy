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
      <div className="flex flex-1 items-center justify-center rounded-3xl bg-slate-100 p-8 text-slate-500">
        لا توجد صور متاحة.
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div
        className={`relative mx-auto flex w-full min-h-[320px] flex-[1.4] items-center justify-center overflow-hidden rounded-[32px] border border-slate-300/50 bg-gradient-to-br from-slate-100 to-slate-200/60 shadow-medium transition-all duration-500 sm:min-h-[420px] md:min-h-[500px] ${
          isSpeaking ? 'ring-4 ring-indigo-500/30 ring-offset-4 ring-offset-slate-100 shadow-glow' : ''
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <button
          type="button"
          onClick={onToggleSound}
          className="absolute left-5 top-5 z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-300/50 bg-white/80 text-2xl shadow-soft backdrop-blur-md transition-all hover:scale-110 hover:bg-white active:scale-95"
          aria-label={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
          title={soundEnabled ? 'الصوت يعمل' : 'الصوت متوقف'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button
          type="button"
          onClick={onSpeak}
          className="flex h-full w-full items-center justify-center p-4 sm:p-8"
          aria-label={`نطق ${nameAr || name}`}
        >
          <SafeImage
            src={image}
            alt={name}
            className={`h-full w-full rounded-[28px] object-contain object-center transition-all duration-700 ${
              isSpeaking ? 'scale-[1.08] drop-shadow-[0_25px_35px_rgba(0,0,0,0.15)]' : 'scale-100 drop-shadow-[0_15px_25px_rgba(0,0,0,0.1)]'
            }`}
            style={{ animation: 'slidePulseIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          />
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-200/80 via-slate-200/20 to-transparent px-5 pb-5 pt-12">
          <p className="text-center text-[10px] font-black tracking-widest text-slate-500 uppercase opacity-70">اضغط على الصورة لسماع النطق</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-300/50 bg-slate-100/80 p-5 shadow-soft backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-300/50 bg-white text-2xl font-bold text-slate-700 shadow-soft transition-all hover:bg-slate-50 hover:scale-110 active:scale-90"
            aria-label="الشريحة التالية"
          >
            ▶
          </button>
          <div className="flex-1 min-w-0">
            <p className={`truncate text-center text-4xl font-black text-slate-900 transition-all duration-300 sm:text-5xl md:text-6xl ${isSpeaking ? 'text-indigo-600 scale-105' : ''}`}>
              {nameAr || name}
            </p>
            <p className="mt-1 text-center text-sm font-bold text-slate-400">
               {index} من {total}
            </p>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-300/50 bg-white text-2xl font-bold text-slate-700 shadow-soft transition-all hover:bg-slate-50 hover:scale-110 active:scale-90"
            aria-label="الشريحة السابقة"
          >
            ◀
          </button>
        </div>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto rounded-[24px] border border-slate-300/50 bg-slate-200/40 p-5 shadow-inner">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`group relative aspect-[4/3] w-36 shrink-0 snap-start overflow-hidden rounded-2xl border-4 transition-all duration-300 sm:w-44 ${
              idx === currentIndex
                ? 'scale-105 border-indigo-500 shadow-medium rotate-1'
                : 'border-white/50 opacity-70 hover:opacity-100 hover:scale-102 hover:border-white shadow-soft'
            }`}
            aria-label={`اختيار ${item.nameAr || item.name}`}
          >
            <SafeImage src={item.image} alt={item.name} className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110 group-hover:brightness-105" />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-2 pt-6">
              <p className="truncate text-center text-[11px] font-black text-white">{item.nameAr || item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
