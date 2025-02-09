import React from 'react'

type ThemeType = 'light' | 'dark'

type ThemeContextType = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = React.useState<ThemeType>('dark')

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])


  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
