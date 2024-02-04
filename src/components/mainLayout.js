import {buttonBackgroundColor, buttonColorArrow, ingredientBackgroundColor} from "../colors";
import {FaArrowLeft, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import LeftColumn from "./leftColumn";
import DefaultPage from "../pages/defaultPage";
import IngredientPage from "../pages/ingredientPage";
import CompareIngredientsPage from "../pages/compareIngredientsPage";
import React, {useCallback, useEffect, useState} from "react";

const MainLayout = ({searchQuery}) => {
    const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a pointer
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [leftColumnVisible, setLeftColumnVisible] = useState(true);
    const [comparisonVisible, setComparisonVisible] = useState(false);
    const [displayIngredient, setDisplayIngredient] = useState(false);

    const handleDisplayIngredient = useCallback((displayIngredient) => {
        setDisplayIngredient(displayIngredient);
    }, [setDisplayIngredient]);

    const handleSetComparisonVisible = useCallback((value) => {
        setComparisonVisible(value);
    }, [setComparisonVisible]);

    const handleToggleLeftColumn = () => {
        setLeftColumnVisible((prevVisible) => !prevVisible);
    };

    const disableScroll = () => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
    };

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


    return (
        <div className="main-layout"
             style={{
                 display: 'flex',
                 flexGrow: 1,
                 position: 'relative',
                 top: '3%',
                 backgroundColor: 'transparent',
                 flex: 1,
                 flexDirection: 'column',
             }}>
            <div style={{
                // backgroundColor: 'red',
                height: '100%',
                width: '3%',
                marginLeft: leftColumnVisible ? '220px' : '0',
                position: 'fixed',
                zIndex: 1,
                transition: 'margin-left 0.2s ease-in-out',
            }}>
                <button onClick={handleToggleLeftColumn}
                        style={{
                            height: '30px',
                            width: '30px',
                            marginTop: '52vh',
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
                backgroundColor: 'transparent',
                marginLeft: leftColumnVisible ? '250px' : '25px',
                marginTop: '65px',
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
                        backgroundColor: 'transparent',
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
                            backgroundColor: 'transparent',
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
                        <CompareIngredientsPage/>
                    </div>
                </div>
            )}
        </div>
    )
};

export default MainLayout;