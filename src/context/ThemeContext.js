import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#121212' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      primary: '#6200EE',
      card: isDarkMode ? '#1E1E1E' : '#F8F9FA',
      border: isDarkMode ? '#333333' : '#E0E0E0',
      error: '#CF6679',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
