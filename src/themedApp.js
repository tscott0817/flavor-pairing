import React from 'react';
import NavBar from "./components/navBar";
import MainLayout from "./components/mainLayout";
import { useThemeContext } from "./stateManager/ThemeContext";
import * as lightColors from "./stateManager/lightMode";
import * as darkColors from "./stateManager/darkMode";

function ThemedApp({ searchQuery, handleSearchQueryChange }) {
    const { theme } = useThemeContext();
    const backgroundColor = theme === lightColors ? lightColors.mainAppColor : darkColors.mainAppColor;

    return (
        <div style={{ backgroundColor: backgroundColor, height: '100vh', overflow: 'auto' }}>
            <NavBar searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
            <MainLayout searchQuery={searchQuery} />
        </div>
    );
}

export default ThemedApp;