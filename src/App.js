import React, {useCallback, useState} from 'react';
import './App.css';
import {mainAppColor,} from "./stateManager/lightMode";
import './animations.css';
import NavBar from "./components/navBar";
import MainLayout from "./components/mainLayout";
import {ThemeProvider} from "./stateManager/ThemeContext";

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = useCallback((newSearchQuery) => {
        setSearchQuery(() => newSearchQuery);
    }, []);

    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column', backgroundColor: 'transparent'}}>
            <ThemeProvider>
                <NavBar searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange}/>
                <MainLayout searchQuery={searchQuery}/>
            </ThemeProvider>
        </div>
    );
}

export default App;
