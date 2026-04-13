import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { WordItem } from '../utils/types'

interface CreateWordInput {
  word: string
  meaning: string
  example: string
  status: WordItem['status']
}

interface WordsContextValue {
  words: WordItem[]
  isHydrated: boolean
  addWord: (input: CreateWordInput) => void
  editWord: (id: string, input: CreateWordInput) => void
  deleteWord: (id: string) => void
}

const WORDS_STORAGE_KEY = 'kalematy_words'

const WordsContext = createContext<WordsContextValue | undefined>(undefined)

export function WordsProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<WordItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(WORDS_STORAGE_KEY)
    if (!raw) {
      setIsHydrated(true)
      return
    }

    try {
      const parsed = JSON.parse(raw) as WordItem[]
      setWords(parsed)
    } catch {
      localStorage.removeItem(WORDS_STORAGE_KEY)
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(words))
  }, [isHydrated, words])

  const addWord = (input: CreateWordInput) => {
    const nextWord: WordItem = {
      id: crypto.randomUUID(),
      ...input,
    }
    setWords((prev) => [nextWord, ...prev])
  }

  const editWord = (id: string, input: CreateWordInput) => {
    setWords((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        return { ...item, ...input }
      }),
    )
  }

  const deleteWord = (id: string) => {
    setWords((prev) => prev.filter((item) => item.id !== id))
  }

  const value = useMemo<WordsContextValue>(
    () => ({
      words,
      isHydrated,
      addWord,
      editWord,
      deleteWord,
    }),
    [isHydrated, words],
  )

  return <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
}

export function useWords() {
  const context = useContext(WordsContext)

  if (!context) {
    throw new Error('useWords must be used within WordsProvider')
  }

  return context
}
