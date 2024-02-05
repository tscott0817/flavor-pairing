import React, {useEffect, useState, useRef, memo} from "react";
import IngredientThumbnail from "../components/cards/ingredientThumbnail";
import {useIngredientContext} from "../stateManager/IngredientContext";
import {
    buttonPlusColor,
    buttonCheckColor,
    defaultPageColor,
    pageColor, buttonMinusColor,
} from "../stateManager/lightMode";
import {FaPlus, FaCheck, FaTimes, FaMinus} from "react-icons/fa";
import flavordb from "../data/flavordb.json";
import {useThemeContext} from "../stateManager/ThemeContext";
import * as lightColors from "../stateManager/lightMode";
import * as darkColors from "../stateManager/darkMode";

const DefaultPage = ({setSelectedIngredientRef, handleDisplayIngredient, searchQuery, selectedFilters}) => {
    console.log('DefaultPage rendered');
    const [flavors, setFlavors] = useState([]);
    const containerRef = useRef(null);
    const {selectedIngredients, selectIngredient, unselectIngredient} = useIngredientContext();
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);
    const { theme } = useThemeContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sortedFlavors = flavordb.sort((a, b) => a.alias.localeCompare(b.alias));
                setFlavors(sortedFlavors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(() => {
        }).catch(error => {
            console.error('Error in useEffect:', error);
        });
    }, [selectedFilters]);

    const handleThumbnailClick = (ingredient) => {
        if (!isButtonHovered) {
            setSelectedIngredientRef({current: ingredient});
            handleDisplayIngredient(true);
        }
    };

    // Observe to animate thumbnails
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateX(0)';
                    } else {
                        entry.target.style.opacity = 0;
                        entry.target.style.transform = 'translateX(-30px)';
                    }
                });
            },
            {threshold: 0.15} // TODO: Adjust this for how much of item is on screen before transition starts
        );

        const elements = document.querySelectorAll('.thumbnail');
        const rowMap = new Map();

        elements.forEach((element, index) => {
            observer.observe(element);

            const rect = element.getBoundingClientRect();
            const row = Math.floor(rect.top / rect.height);

            if (!rowMap.has(row)) {
                rowMap.set(row, 0);
            }

            const cumulativeWidth = rowMap.get(row);
            const delay = cumulativeWidth / rect.width * 0.1;

            element.style.transition = `opacity 0.5s ${delay}s, transform .5s ${delay}s`;
            element.style.transform = `translateX(-${cumulativeWidth}px)`;

            rowMap.set(row, cumulativeWidth + rect.width);

            element.addEventListener('mouseover', () => {
                element.style.transition = 'transform 0.2s';
                element.style.transform = 'scale(1.05) rotate(-2deg)';
            });
            element.addEventListener('mouseout', () => {
                element.style.transition = 'transform 0.1s';
                element.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        return () => {
            observer.disconnect();
        };
    }, [flavors, searchQuery, selectedFilters]);


    // Reset styles when search is cleared
    useEffect(() => {
        const elements = document.querySelectorAll('.thumbnail');
        elements.forEach((element) => {
            element.style.opacity = 1;
            element.style.transform = 'translateX(0)';
        });
    }, [searchQuery]);

    const filteredFlavors = flavors.filter((flavor) => {
        const matchesSearch = flavor.alias.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(flavor.category);

        return matchesSearch && matchesFilter;
    });

    const handleAddToComparison = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            unselectIngredient(ingredient);
        } else {
            selectIngredient(ingredient);
        }
    };

    return (
        <div style={{
            backgroundColor: theme === lightColors ? lightColors.mainAppColor : darkColors.mainAppColor,
            minWidth: '800px'
        }}>
            <div
                ref={containerRef}
                style={{
                    width: '98%',
                    height: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '1%',
                    backgroundColor: theme === lightColors ? lightColors.mainAppColor : darkColors.mainAppColor,
                }}
            >
                {searchQuery && filteredFlavors.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        width: '100%',
                        padding: '20px',
                    }}>
                        {selectedFilters.length === 0 ? (
                            <div style={{
                                marginTop: '40vh'
                            }}>
                                <p>No results found for "{searchQuery}"</p>
                            </div>
                        ) : (
                            <div style={{
                                marginTop: '40vh'
                            }}>
                                <p>No results found for "{searchQuery}" in categories: </p>
                                <p>{selectedFilters.join(', ')}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    filteredFlavors.map((flavor) => (
                        <div
                            key={flavor.entityID}
                            className="thumbnail"
                            style={{
                                flex: '1 0 23%',
                                margin: '1%',
                                cursor: 'pointer',
                                minWidth: '250px',
                                maxWidth: '50%',
                                // height: '40vh',
                                height: '40vh',
                                minHeight: '275px',
                                opacity: 0,
                            }}
                            onClick={() => handleThumbnailClick(flavor)}
                        >
                            <IngredientThumbnail
                                ingredient={flavor}
                                ingredient_name={flavor.alias}
                                ingredient_id={flavor.entityID}
                            />
                            <div
                                style={{
                                    // backgroundColor: 'red',
                                    position: 'absolute',
                                    right: 5,
                                    bottom: 5,
                                }}
                            >
                                <button
                                    onMouseEnter={() => {
                                        setHoveredButton(flavor.entityID);
                                        setIsButtonHovered(true);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredButton(null);
                                        setIsButtonHovered(false);
                                    }}
                                    onClick={() => handleAddToComparison(flavor)}
                                    style={{
                                        margin: '1%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: selectedIngredients.includes(flavor)
                                            ? (theme === lightColors ? lightColors.buttonMinusColor : darkColors.buttonMinusColor)
                                            : (theme === lightColors ? lightColors.buttonPlusColor : darkColors.buttonPlusColor),
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {selectedIngredients.includes(flavor) ? <FaMinus/> : <FaPlus/>}
                                    {/*{selectedIngredients.includes(flavor) && hoveredButton === flavor.entityID ? (*/}
                                    {/*    <FaMinus/>*/}
                                    {/*) : (*/}
                                    {/*    selectedIngredients.includes(flavor) ? <FaCheck/> : <FaPlus/>*/}
                                    {/*)}*/}
                                </button>
                                {/*<button*/}
                                {/*    onMouseEnter={() => setIsButtonHovered(true)}*/}
                                {/*    onMouseLeave={() => setIsButtonHovered(false)}*/}
                                {/*    onClick={() => handleAddToComparison(flavor)}*/}
                                {/*    style={{*/}
                                {/*        margin: '1%',*/}
                                {/*        display: 'flex',*/}
                                {/*        alignItems: 'center',*/}
                                {/*        justifyContent: 'center',*/}
                                {/*        width: '25px',*/}
                                {/*        height: '25px',*/}
                                {/*        borderRadius: '50%',*/}
                                {/*        backgroundColor: selectedIngredients.includes(flavor) ? buttonCheckColor : buttonPlusColor,*/}
                                {/*        color: 'white',*/}
                                {/*        border: 'none',*/}
                                {/*        cursor: 'pointer',*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    {selectedIngredients.includes(flavor) && isButtonHovered ? (*/}
                                {/*        <FaTimes/>*/}
                                {/*    ) : (*/}
                                {/*        selectedIngredients.includes(flavor) ? <FaCheck/> : <FaPlus/>*/}
                                {/*    )}*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DefaultPage;