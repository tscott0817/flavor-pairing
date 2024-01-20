import React, {useState, useEffect, useCallback, useRef} from 'react';
import './App.css';
import CompareIngredientsPage from "./pages/compareIngredientsPage";
import IngredientPage from "./pages/ingredientPage";
import DefaultPage from "./pages/defaultPage";
import {useIngredientContext} from "./stateManager/IngredientContext";
import IngredientThumbnail from "./components/cards/ingredientThumbnail";
import {FaTimes} from 'react-icons/fa';
import {FaArrowLeft} from "react-icons/fa";
import {FaRegChartBar} from "react-icons/fa";
import {
    ingredientBackgroundColor,
    mainAppColor,
    navBarColor,
    buttonBackgroundColor,
    searchBarColor,
    buttonColorArrow, selectionColor, buttonColor
} from "./colors";
import './animations.css';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import FiltersCard from "./components/cards/filtersCard";
import NavBar from "./components/navBar";
import LeftColumn from "./components/leftColumn";

function App() {
    const [key, setKey] = useState(0); // Add a key state
    const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a pointer
    const [displayIngredient, setDisplayIngredient] = useState(false);
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [leftColumnVisible, setLeftColumnVisible] = useState(false);
    const [comparisonVisible, setComparisonVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    // TODO: Apparently callback better? Not sure why, see if need to implement for other functions
    const handleDisplayIngredient = useCallback((displayIngredient) => {
        setDisplayIngredient(displayIngredient);
    }, [setDisplayIngredient]);

    const handleToggleLeftColumn = () => {
        setLeftColumnVisible((prevVisible) => !prevVisible);
    };

    const handleSetComparisonVisible = (value) => {
        setComparisonVisible(value);
    }

    useEffect(() => {
        const handleResize = () => {
            // Check the window width and update left column visibility
            const isSmallScreen = window.innerWidth <= 810;
            setLeftColumnVisible(!isSmallScreen);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on mount
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures that the effect runs only on mount and unmount

    useEffect(() => {
        // Conditionally set the body overflow based on the comparisonVisible state
        if (comparisonVisible || displayIngredient) {
            disableScroll();
        } else {
            enableScroll();
        }

        // Cleanup function to revert changes on component unmount
        return () => {
            enableScroll();
        };
    }, [comparisonVisible, displayIngredient]);

    const disableScroll = () => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
    };

    return (
        <div key={key} className="App"
             style={{display: 'flex', flexDirection: 'column', backgroundColor: mainAppColor}}>
            <NavBar setSearchQuery={setSearchQuery} />
            <div className="main-layout"
                 style={{
                     display: 'flex',
                     flexGrow: 1,
                     position: 'relative',
                     top: '3%',
                     // backgroundColor: 'maroon',
                     flex: 1,
                     flexDirection: 'column',
                 }}>

                <div style={{
                    // backgroundColor: 'red',
                    height: '100%',
                    width: '3%',
                    marginLeft: leftColumnVisible ? '225px' : '0',
                    position: 'fixed',
                    zIndex: 1,
                    transition: 'margin-left 0.2s ease-in-out',
                }}>
                    <button onClick={handleToggleLeftColumn}
                            style={{
                                height: '30px',
                                width: '30px',
                                marginTop: '51vh',
                                marginRight: '100%',
                                left: 0,
                                backgroundColor: buttonBackgroundColor,
                                borderRadius: '50px',
                                border: 'none',
                                color: buttonColorArrow,
                                cursor: 'pointer',
                            }}>
                        {leftColumnVisible ? <FaChevronLeft size={'20px'}/> : <FaChevronRight size={'20px'}/>}
                    </button>
                </div>
                <LeftColumn leftColumnVisible={leftColumnVisible}
                            handleSetComparisonVisible={handleSetComparisonVisible}
                            setSelectedFilters={setSelectedFilters}
                            selectedFilters={selectedFilters}
                />


                <div className="main-content" style={{
                    flex: '1',
                    // backgroundColor: 'red',
                    marginLeft: leftColumnVisible ? '250px' : '25px',
                    marginTop: '60px',
                    overflow: 'auto',
                    transition: 'margin-left 0.2s ease-in-out',
                }}>
                    <DefaultPage setSelectedIngredientRef={setSelectedIngredientRef}
                                 handleDisplayIngredient={handleDisplayIngredient}
                                 searchQuery={searchQuery}
                                 selectedFilters={selectedFilters}/>
                </div>
                {displayIngredient && (
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '110%',  // 110% because some weird whitespace shows on window resize
                        height: '110%',
                        backgroundColor: ingredientBackgroundColor,
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                         onClick={(e) => {
                             // Check if the target is the highest parent div
                             if (e.currentTarget === e.target) {
                                 setDisplayIngredient(false);
                             }
                         }}>
                        <div style={{
                            width: '65%',
                            minWidth: '900px',
                            height: '85%',
                            minHeight: '85%',
                            position: 'relative',
                        }}>
                            <FaArrowLeft
                                onClick={() => setDisplayIngredient(false)}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: buttonColorArrow,
                                    zIndex: 2,
                                }}
                            />
                            <IngredientPage ingredient={selectedIngredientRef.current}/>
                        </div>
                    </div>
                )}


                {comparisonVisible && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '110%',
                            height: '110%',
                            backgroundColor: ingredientBackgroundColor,
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={(e) => {
                            // Check if the target is the highest parent div
                            if (e.currentTarget === e.target) {
                                setComparisonVisible(false);
                            }
                        }}
                    >
                        <div
                            style={{
                                width: '65%',
                                height: '85%',
                                minWidth: '900px',
                                position: 'relative',
                            }}
                        >
                            <FaArrowLeft
                                onClick={() => setComparisonVisible(false)}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    left: 10,
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: buttonColorArrow,
                                    zIndex: 2,
                                }}
                            />
                            {/*TODO: Prop drilling issue here*/}
                            <CompareIngredientsPage />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
