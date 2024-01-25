import React, {useEffect, useState, useCallback} from 'react';
import flavordb from "../../data/flavordb.json";

const IngredientCard = ({ingredient}) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (ingredient) {
                const entity_id = ingredient.entityID;

                try {
                    const flavorData = flavordb.find(item => item.entityID === entity_id);

                    if (flavorData) {
                        setIngredientData(flavorData);
                    } else {
                        setErrorMessage('Ingredient not found');
                    }
                } catch (error) {
                    console.error('Error fetching or parsing data:', error);
                    setErrorMessage('Error fetching data');
                }
            }
        };

        fetchData();
    }, [ingredient]);

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            {ingredientData && (
                <div>
                    <div
                        className="top-left-section"
                        style={{display: 'flex', flexDirection: 'column'}}
                    >
                        <div
                            className="alias"
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.5em',
                                marginBottom: '10px',
                                color: '#333'
                            }}
                        >
                            {ingredientData.alias
                                .split(' ')
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(' ')}
                        </div>
                        <div
                            className="scientific-name"
                            style={{
                                fontSize: '0.8em',
                                color: '#555'
                            }}
                        >
                            {ingredientData.scientificName ? ingredientData.scientificName.replace(/\b\w/g, (char) => char.toUpperCase()) : "NA"}
                        </div>
                        <div
                            className="category"
                            style={{
                                // fontSize: '0.8vw',
                                fontSize: '0.8em',
                                color: '#555'
                            }}
                        >
                            {ingredientData.category.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientCard;
