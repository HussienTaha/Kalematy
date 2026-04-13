import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CategoryItem } from '../data/categories'

interface CategoryProgress {
  clickCount: number
  viewedItemIds: string[]
}

interface CategorySliderContextValue {
  selectedCategory: CategoryItem | null
  isOpen: boolean
  currentIndex: number
  soundEnabled: boolean
  progressByCategory: Record<string, CategoryProgress>
  openCategory: (category: CategoryItem) => void
  closeModal: () => void
  nextSlide: () => void
  prevSlide: () => void
  setCurrentIndex: (index: number) => void
  toggleSound: () => void
  recordImageClick: (categoryId: string, itemId: string) => void
}

const CategorySliderContext = createContext<CategorySliderContextValue | undefined>(undefined)
const SOUND_STORAGE_KEY = 'kalematy_kids_sound_enabled'
const PROGRESS_STORAGE_KEY = 'kalematy_kids_category_progress'

export function CategorySliderProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem(SOUND_STORAGE_KEY)
    return stored === null ? true : stored === 'true'
  })
  const [progressByCategory, setProgressByCategory] = useState<Record<string, CategoryProgress>>(() => {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (!stored) return {}
    try {
      return JSON.parse(stored) as Record<string, CategoryProgress>
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(SOUND_STORAGE_KEY, String(soundEnabled))
  }, [soundEnabled])

  useEffect(() => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressByCategory))
  }, [progressByCategory])

  const openCategory = (category: CategoryItem) => {
    setSelectedCategory(category)
    setCurrentIndex(0)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const nextSlide = () => {
    if (!selectedCategory || selectedCategory.items.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % selectedCategory.items.length)
  }

  const prevSlide = () => {
    if (!selectedCategory || selectedCategory.items.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + selectedCategory.items.length) % selectedCategory.items.length)
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  const recordImageClick = (categoryId: string, itemId: string) => {
    setProgressByCategory((prev) => {
      const existing = prev[categoryId] ?? { clickCount: 0, viewedItemIds: [] }
      const viewedSet = new Set(existing.viewedItemIds)
      viewedSet.add(itemId)

      return {
        ...prev,
        [categoryId]: {
          clickCount: existing.clickCount + 1,
          viewedItemIds: Array.from(viewedSet),
        },
      }
    })
  }

  const value = useMemo<CategorySliderContextValue>(
    () => ({
      selectedCategory,
      isOpen,
      currentIndex,
      soundEnabled,
      progressByCategory,
      openCategory,
      closeModal,
      nextSlide,
      prevSlide,
      setCurrentIndex,
      toggleSound,
      recordImageClick,
    }),
    [currentIndex, isOpen, progressByCategory, selectedCategory, soundEnabled],
  )

  return <CategorySliderContext.Provider value={value}>{children}</CategorySliderContext.Provider>
}

export function useCategorySlider() {
  const context = useContext(CategorySliderContext)
  if (!context) throw new Error('useCategorySlider must be used within CategorySliderProvider')
  return context
}
