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
import {TbLetterX} from "react-icons/tb";
import {IoSearchOutline} from "react-icons/io5";
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

function App() {
    // const [currentPage, setCurrentPage] = useState('defaultPage');
    const [key, setKey] = useState(0); // Add a key state
    const [selectedIngredientRef, setSelectedIngredientRef] = useState(null);  // Pretending this is like a pointer
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const [displayIngredient, setDisplayIngredient] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [leftColumnVisible, setLeftColumnVisible] = useState(false);
    const [comparisonVisible, setComparisonVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isIngredientSelected, setIsIngredientSelected] = useState(false);

    // TODO: Apparently callback better? Not sure why, see if need to implement for other functions
    const handleDisplayIngredient = useCallback((displayIngredient) => {
        setDisplayIngredient(displayIngredient);
    }, [setDisplayIngredient]);

    const handleShowSelectedIngredients = () => {
        setComparisonVisible(true);
    };

    const handleRemoveIngredient = (index) => {
        if (selectedIngredients.length >= index + 1) {
            const ingredientToRemove = selectedIngredients[index];
            unselectIngredient(ingredientToRemove);
        }
    };

    const handleSearchInputChange = event => {
        setSearchQuery(event.target.value);
    };

    const handleToggleLeftColumn = () => {
        setLeftColumnVisible((prevVisible) => !prevVisible);
    };

    useEffect(() => {
        // Update the isIngredientSelected state based on whether an ingredient is selected
        setIsIngredientSelected(selectedIngredients.length > 0);
    }, [selectedIngredients]);

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

    // New function to handle selecting a filter
    const handleFilterSelect = (filter) => {
        // Toggle the selected filter
        setSelectedFilters((prevFilters) => {
            const updatedFilters = prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter];

            return updatedFilters.length > 0 ? updatedFilters : []; // Ensure it's always an array
        });
    };

    const disableScroll = () => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
    };

    const eraseInputText = () => {
        setSearchQuery('');
    }


    return (
        <div key={key} className="App"
             style={{display: 'flex', flexDirection: 'column', backgroundColor: mainAppColor}}>
            <div
                style={{
                    backgroundColor: navBarColor,
                    width: '100%',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    zIndex: 1,
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
                    padding: '0 10px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '25px',
                        overflow: 'hidden',
                        backgroundColor: searchBarColor,
                        height: '75%',
                        width: '30%',
                        minWidth: '400px',
                        // padding: '8px',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                        margin: 'auto',
                    }}
                >
                    {/* Eyeglass search icon */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '8px',
                        marginLeft: '4px',
                    }}>
                        <IoSearchOutline style={{
                            color: '#333',
                            height: '20px',
                            width: '20px',
                        }}/>
                    </div>

                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search for ingredients..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        style={{
                            border: 'none',
                            outline: 'none',
                            padding: '8px',
                            flex: '1',
                            // borderRadius: '8px',
                            height: '70%',
                            // borderLeft: '1px solid #999',
                            // borderRight: '1px solid #999',
                            borderRadius: '8px',
                            backgroundColor: searchBarColor,
                            fontSize: '16px',
                            color: 'rgba(50, 50, 50, 0.8)',
                        }}
                    />

                    {/* 'X' button */}
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            marginLeft: '4px',
                            marginRight: '4px',
                        }}
                        onClick={() => eraseInputText()}
                    >
                        <TbLetterX
                            style={{
                                width: '20px',
                                height: '20px',
                                color: '#555',
                            }}
                        />
                    </button>
                </div>
            </div>
            <div className="main-layout"
                 style={{
                     // display: 'flex',
                     // flexGrow: 1,
                     // marginTop: '60px',
                     // position: 'relative',
                     // top: '3%',
                     display: 'flex',
                     flexGrow: 1,
                     // marginTop: '60px',
                     position: 'relative',
                     top: '3%',
                     // backgroundColor: 'maroon',
                     flex: 1, // Set flex property to 1
                     flexDirection: 'column', // Set flex container direction to column
                 }}>
                <div className="left-column" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    // backgroundColor: 'pink',
                    width: '225px',
                    height: '100vh',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.2s ease-in-out',
                    transform: leftColumnVisible ? 'translateX(0)' : 'translateX(-225px)',
                }}>
                    <div style={{
                        // backgroundColor: 'orange',
                        // padding: '2%',
                        width: '100%',
                        marginTop: '75px',
                        position: 'absolute',
                        zIndex: 2,
                        // position: 'fixed',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // padding: '1%',
                            // backgroundColor: 'purple'
                        }}>

                            {/* First div */}
                            <div style={{
                                position: 'relative',
                                height: '75px',
                                width: '30%',
                                // transform: leftColumnVisible ? 'translateX(0)' : 'translateX(-100%)', // Move left offscreen
                                backgroundColor: selectionColor,
                                borderRadius: '8px',
                                marginLeft: '25px',
                                // transition: 'transform 0.3s ease', // Add transition effect
                            }}>
                                {selectedIngredients.length > 0 && (
                                    <div style={{
                                        position: 'relative',
                                        height: '100%',
                                    }}>
                                        <div style={{
                                            position: 'relative',
                                            zIndex: 3,
                                            width: '50%',
                                            marginLeft: '90%'
                                        }}>
                                            <button
                                                onClick={() => handleRemoveIngredient(0)}
                                                style={{
                                                    backgroundColor: buttonBackgroundColor,
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}>
                                                <FaTimes/>
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 2,
                                            }}
                                        >
                                            <IngredientThumbnail ingredient_name={selectedIngredients[0].alias}
                                                                 ingredient_id={selectedIngredients[0].entityID}
                                                                 font_size={'10px'}/>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Second div */}
                            <div style={{
                                position: 'relative',
                                height: '75px',
                                width: '30%',
                                // transform: leftColumnVisible ? 'translateX(0)' : 'translateX(-100%)', // Move left offscreen
                                backgroundColor: selectionColor,
                                borderRadius: '8px',
                                marginLeft: '35px',
                                // transition: 'transform 0.3s ease', // Add transition effect
                            }}>
                                {selectedIngredients.length > 1 && (
                                    <div style={{
                                        position: 'relative',
                                        height: '100%',
                                    }}>
                                        <div style={{
                                            position: 'relative',
                                            zIndex: 3,
                                            width: '50%',
                                            marginLeft: '90%'
                                        }}>
                                            <button
                                                onClick={() => handleRemoveIngredient(1)}
                                                style={{
                                                    backgroundColor: buttonBackgroundColor,
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}>
                                                <FaTimes/>
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 2,
                                            }}
                                        >
                                            <IngredientThumbnail ingredient_name={selectedIngredients[1].alias}
                                                                 ingredient_id={selectedIngredients[1].entityID}
                                                                 font_size={'10px'}/>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>


                        <div style={{
                            position: 'relative',
                            padding: '1%',
                            // backgroundColor: 'green'
                        }}>
                            <button onClick={handleShowSelectedIngredients} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                whiteSpace: 'pre-line',
                                width: '90%',
                                marginTop: '5%',
                                marginBottom: '5%',
                                marginLeft: '5%',
                                padding: '10px', // Add padding for better aesthetics
                                backgroundColor: buttonColor, // Set background color
                                color: '#f4f3f2', // Set text color
                                border: 'none', // Remove default button border
                                borderRadius: '5px', // Add border-radius for rounded corners
                                cursor: 'pointer', // Add pointer cursor on hover
                                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
                            }}>
                                {/*<FaChartLine style={{marginRight: '10px'}}/> Compare Ingredients*/}
                                <FaRegChartBar style={{marginRight: '10px'}}/> Compare Ingredients

                            </button>
                        </div>
                        <div style={{
                            // backgroundColor: 'blue',
                            // borderBottom: '1px solid #999'
                        }}>
                            <h3>Categories</h3>
                        </div>
                    </div>
                    <div style={{
                        // backgroundColor: 'red',
                        // padding: '2%',
                        paddingLeft: '2%',
                        paddingRight: '2%',
                        paddingTop: '2%',
                        borderTop: '1px solid #999',
                        // marginTop: 'auto',  // This will push the div to the bottom
                        marginTop: '240px',
                        marginBottom: 'auto',
                        overflow: 'auto', // Add this line to enable scrolling
                    }}>
                        <FiltersCard selectedFilters={selectedFilters} handleFilterSelect={handleFilterSelect}/>
                    </div>
                </div>
                <div style={{
                    // backgroundColor: 'red',
                    height: '100%',
                    // width: '37.5px',
                    width: '3%',
                    marginLeft: leftColumnVisible ? '225px' : '0', // Update marginLeft based on left column width
                    position: 'fixed',
                    zIndex: 1,
                    transition: 'margin-left 0.2s ease-in-out', // Adjust transition duration and timing function
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

                <div className="main-content" style={{
                    flex: '1',
                    // backgroundColor: 'red',
                    // marginLeft: leftColumnVisible ? '237.5px' : '12.5px',
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
                        // overflowY: 'auto', // Add this line to enable scrolling
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            width: '65%',
                            minWidth: '900px',
                            height: '85%',
                            minHeight: '85%',
                            position: 'relative', // Add this line to make the position relative
                        }}>
                            <FaArrowLeft
                                onClick={() => setDisplayIngredient(false)}
                                style={{
                                    position: 'absolute',
                                    top: 10, // Adjust the top value to your preference
                                    left: 10, // Adjust the left value to your preference
                                    cursor: 'pointer',
                                    fontSize: '24px', // Adjust the font size as needed
                                    color: buttonColorArrow, // Adjust the color as needed
                                    zIndex: 2,
                                }}
                            />
                            <IngredientPage ingredient={selectedIngredientRef.current}/>
                        </div>
                    </div>
                )}


                {/*TODO: FOR IF I WANT TO SHOW THE COMPARISON AS OVERLAY*/}
                {comparisonVisible && (
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '110%',  // 110% because some weird whitespace shows on window resize
                        height: '110%',
                        backgroundColor: ingredientBackgroundColor,
                        zIndex: 1,
                        // overflowY: 'auto', // Add this line to enable scrolling
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                        // onClick={() => setComparisonVisible(false)}  // Close comparison when clicking on the background overlay
                    >
                        <div style={{
                            width: '65%',
                            height: '85%',
                            minWidth: '900px',
                            position: 'relative', // Add this line to make the position relative
                        }}>
                            <FaArrowLeft
                                onClick={() => setComparisonVisible(false)}
                                style={{
                                    position: 'absolute',
                                    top: 10, // Adjust the top value to your preference
                                    left: 10, // Adjust the left value to your preference
                                    cursor: 'pointer',
                                    fontSize: '24px', // Adjust the font size as needed
                                    color: buttonColorArrow, // Adjust the color as needed
                                    zIndex: 2,
                                }}
                            />
                            {/*TODO: Prop drilling issue here*/}
                            <CompareIngredientsPage
                                ingredient1={selectedIngredients[0]}
                                ingredient2={selectedIngredients[1]}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default App;
