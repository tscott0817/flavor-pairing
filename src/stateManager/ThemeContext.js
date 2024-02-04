// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import * as lightColors from './lightMode';
import * as darkColors from './darkMode';

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(lightColors); // Start with light mode by default

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === lightColors ? darkColors : lightColors));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
