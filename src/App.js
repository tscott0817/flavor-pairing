import React, { useCallback, useState } from 'react';
import './App.css';
import ThemedApp from './themedApp';
import { ThemeProvider } from "./stateManager/ThemeContext";

function App() {
    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <ThemeProvider>
                <ThemedApp />
            </ThemeProvider>
        </div>
    );
}

export default App;
