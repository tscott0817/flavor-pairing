import React, { useCallback, useState } from 'react';
import './App.css';
import ThemedApp from './themedApp';
import { ThemeProvider } from "./stateManager/ThemeContext";

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = useCallback((newSearchQuery) => {
        setSearchQuery(() => newSearchQuery);
    }, []);

    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <ThemeProvider>
                <ThemedApp searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
            </ThemeProvider>
        </div>
    );
}

export default App;
