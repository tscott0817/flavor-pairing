import React, {useCallback, useState} from 'react';
import './App.css';
import {mainAppColor,} from "./colors";
import './animations.css';
import NavBar from "./components/navBar";
import MainLayout from "./components/mainLayout";

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: Not sure I really need callback in this instance
    const handleSearchQueryChange = useCallback((newSearchQuery) => {
        setSearchQuery(() => newSearchQuery);
    }, []);

    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column', backgroundColor: mainAppColor}}>
            <NavBar searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange}/>
            <MainLayout searchQuery={searchQuery}/>
        </div>
    );
}

export default App;
