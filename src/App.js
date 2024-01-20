import React, {useState} from 'react';
import './App.css';
import {mainAppColor,} from "./colors";
import './animations.css';
import NavBar from "./components/navBar";
import MainLayout from "./components/mainLayout";

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column', backgroundColor: mainAppColor}}>
            <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <MainLayout searchQuery={searchQuery}/>
        </div>
    );
};

export default App;
