import {buttonBackgroundColor, buttonColor, selectionColor} from "../colors";
import {FaRegChartBar, FaTimes} from "react-icons/fa";
import IngredientThumbnail from "./cards/ingredientThumbnail";
import FiltersCard from "./cards/filtersCard";
import React, {useState} from "react";
import {useIngredientContext} from "../stateManager/IngredientContext";

const LeftColumn = ({leftColumnVisible, handleSetComparisonVisible, setSelectedFilters, selectedFilters}) => {

    const [showTooltip, setShowTooltip] = useState(false);
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const handleShowSelectedIngredients = () => {
        if (!selectedIngredients || !selectedIngredients[0] || !selectedIngredients[1]) {

            setShowTooltip(true);
            setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
        } else {
            handleSetComparisonVisible(true);
        }
    };

    const handleRemoveIngredient = (index) => {
        if (selectedIngredients.length >= index + 1) {
            const ingredientToRemove = selectedIngredients[index];
            unselectIngredient(ingredientToRemove);
        }
    };

    const handleFilterSelect = (filter) => {
        // Toggle the selected filter
        setSelectedFilters((prevFilters) => {
            const updatedFilters = prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter];

            return updatedFilters.length > 0 ? updatedFilters : []; // Ensure it's always an array
        });
    };

    return (
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
                width: '100%',
                marginTop: '75px',
                position: 'absolute',
                zIndex: 2,
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // backgroundColor: 'purple'
                }}>
                    <div style={{
                        position: 'relative',
                        height: '75px',
                        width: '30%',
                        backgroundColor: selectionColor,
                        borderRadius: '8px',
                        marginLeft: '25px',
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
                    <div style={{
                        position: 'relative',
                        height: '75px',
                        width: '30%',
                        backgroundColor: selectionColor,
                        borderRadius: '8px',
                        marginLeft: '35px',
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
                                            // backgroundColor: 'red',
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
                    <button
                        onClick={handleShowSelectedIngredients}
                        // disabled={!selectedIngredients || !selectedIngredients[0] || !selectedIngredients[1]}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'pre-line',
                            width: '90%',
                            marginTop: '5%',
                            marginBottom: '5%',
                            marginLeft: '5%',
                            padding: '10px',
                            backgroundColor: buttonColor,
                            color: '#f4f3f2',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontFamily: 'Roboto, sans-serif'
                        }}>
                        <FaRegChartBar style={{marginRight: '10px'}}/> Compare Ingredients

                    </button>
                    {showTooltip && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#ffcc00',
                            padding: '8px',
                            borderRadius: '5px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                            zIndex: 1,
                        }}>
                            Please Select 2 Ingredients
                        </div>
                    )}
                </div>
                <div style={{
                    // backgroundColor: 'blue',
                    // borderBottom: '1px solid #999'
                    fontFamily: 'Roboto, sans-serif'
                }}>
                    <h3>Categories</h3>
                </div>
            </div>
            <div style={{
                // backgroundColor: 'red',
                paddingLeft: '2%',
                paddingRight: '2%',
                paddingTop: '2%',
                borderTop: '1px solid #999',
                marginTop: '240px',
                marginBottom: 'auto',
                overflow: 'auto', // Add this line to enable scrolling
            }}>
                <FiltersCard selectedFilters={selectedFilters} handleFilterSelect={handleFilterSelect}/>
            </div>
        </div>
    )
}

export default LeftColumn;