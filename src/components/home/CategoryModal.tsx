import { useEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import { useCategorySlider } from '../../context/CategorySliderContext'
import ImageSlider from './ImageSlider'
import ModalShell from './ModalShell'

function CategoryModal() {
  const {
    selectedCategory,
    isOpen,
    currentIndex,
    closeModal,
    nextSlide,
    prevSlide,
    soundEnabled,
    toggleSound,
    progressByCategory,
    recordImageClick,
    setCurrentIndex,
  } = useCategorySlider()
  const touchStartX = useRef<number | null>(null)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const currentItem = selectedCategory?.items[currentIndex]

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    if (delta > 40) prevSlide()
    if (delta < -40) nextSlide()
    touchStartX.current = null
  }

  useEffect(() => {
    const synth = window.speechSynthesis
    const loadVoices = () => {
      const availableVoices = synth.getVoices()
      setVoices(availableVoices)
    }

    loadVoices()
    synth.addEventListener('voiceschanged', loadVoices)

    return () => {
      synth.removeEventListener('voiceschanged', loadVoices)
      synth.cancel()
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
      if (event.key === 'ArrowRight') nextSlide()
      if (event.key === 'ArrowLeft') prevSlide()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, nextSlide, prevSlide])

  const pickVoice = () => {
    const arabicVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('ar'))
    return arabicVoices[0] ?? voices[0]
  }

  const speakWord = () => {
    if (!soundEnabled || !selectedCategory || !currentItem) return

    const synth = window.speechSynthesis
    synth.cancel()
    recordImageClick(selectedCategory.id, currentItem.id)

    const utterance = new SpeechSynthesisUtterance(
      currentItem.audioTextAr || currentItem.nameAr || currentItem.audioText || currentItem.name,
    )
    const voice = pickVoice()

    if (voice) utterance.voice = voice

    utterance.lang = 'ar-SA'
    utterance.rate = 0.75
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    synth.speak(utterance)
  }

  const handleClose = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    closeModal()
  }

  if (!isOpen || !selectedCategory || !currentItem) return null

  return (
    <ModalShell title={`عارض ${selectedCategory.name}`}>
      <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-3 py-2 sm:mb-4 sm:px-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-extrabold text-white sm:text-3xl">{selectedCategory.name}</h3>
          <p className="mt-1 text-sm text-slate-300">
            الإكمال: {progressByCategory[selectedCategory.id]?.viewedItemIds?.length ?? 0}/{selectedCategory.items.length}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="grid min-h-12 min-w-12 place-items-center rounded-full bg-white/10 px-3 py-2 text-base font-bold text-white transition hover:scale-105 hover:bg-white/20"
          aria-label="إغلاق"
        >
          ✕
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <ImageSlider
          items={selectedCategory.items}
          currentIndex={currentIndex}
          onSelectIndex={setCurrentIndex}
          image={currentItem.image}
          name={currentItem.name}
          nameAr={currentItem.nameAr}
          index={currentIndex + 1}
          total={selectedCategory.items.length}
          isSpeaking={isSpeaking}
          onSpeak={speakWord}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onPrev={prevSlide}
          onNext={nextSlide}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </div>
    </ModalShell>
  )
}

export default CategoryModal
