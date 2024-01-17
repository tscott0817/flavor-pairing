import React, {useEffect} from "react";


const FiltersCard = ({selectedFilters, handleFilterSelect}) => {
    const categories = [
        "additive",
        "bakery",
        "berry",
        "beverage",
        "beverage alcoholic",
        "beverage caffeinated",
        "cabbage",
        "cereal",
        "dairy",
        "dish",
        "essential oil",
        "fish",
        "flower",
        "fruit",
        "fruit citrus",
        "fruit essence",
        "fruit-berry",
        "fungus",
        "gourd",
        "herb",
        "legume",
        "maize",
        "meat",
        "nut",
        "plant",
        "plant derivative",
        "seafood",
        "seed",
        "spice",
        "vegetable",
        "vegetable fruit",
        "vegetable root",
        "vegetable stem",
        "vegetable tuber"
    ]

    const column1 = categories.slice(0, Math.ceil(categories.length / 2));
    const column2 = categories.slice(Math.ceil(categories.length / 2));

    return (
            <div
                style={{
                    display: 'flex',
                    // backgroundColor: 'green',
                    // Set a max height for the red div
                    height: '100%',
                    position: 'relative',
                    // maxHeight: '250px',
                    // padding: '2%',
                    // marginTop: '200px',
                    // margin: '2%',
                    // Enable vertical scrolling if content exceeds maxHeight
                    // overflowY: 'auto',
                    zIndex: 1,
                }}
            >
                <ul style={{textAlign: 'left', listStyleType: 'none', padding: 0, fontSize: '15px'}}>
                    {column1.map((category) => (
                        <li key={category}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(category)}
                                    onChange={() => handleFilterSelect(category)}
                                    style={{marginRight: '5px', marginBottom: '5px'}}
                                />
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
                <ul style={{textAlign: 'left', listStyleType: 'none', padding: 0, fontSize: '15px'}}>
                    {column2.map((category) => (
                        <li key={category}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(category)}
                                    onChange={() => handleFilterSelect(category)}
                                    style={{marginRight: '5px', marginBottom: '5px'}}
                                />
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
                {/*<div style={{backgroundColor: 'chartreuse', width: '10px', height: '100px'}}></div>*/}
            </div>
    );
};

export default FiltersCard;