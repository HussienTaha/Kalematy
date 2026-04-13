import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CategorySliderProvider } from './context/CategorySliderContext'
import { ThemeProvider } from './context/ThemeContext'
import { WordsProvider } from './context/WordsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CategorySliderProvider>
            <WordsProvider>
              <App />
            </WordsProvider>
          </CategorySliderProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
