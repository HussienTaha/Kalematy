export type WordStatus = 'easy' | 'medium' | 'hard'

export interface WordItem {
  id: string
  word: string
  meaning: string
  example: string
  status: WordStatus
}
