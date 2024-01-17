import React, {useEffect, useState, useCallback} from 'react';
import flavordb from "../../data/flavordb.json";

const IngredientCard = ({ingredient}) => {
    const [ingredientData, setIngredientData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchIngredientData = useCallback(async () => {
        if (ingredient) {
            const entity_id = ingredient.entityID;

            try {
                // Find the flavor information for the given entity_id
                const flavorData = flavordb.find(item => item.entityID === entity_id);

                if (flavorData) {
                    console.log(flavorData);
                    setIngredientData(flavorData);
                } else {
                    setErrorMessage('Ingredient not found');
                }
            } catch (error) {
                console.error('Error fetching or parsing data:', error);
                setErrorMessage('Error fetching data');
            }
        }
    }, [ingredient]);

    useEffect(() => {
        fetchIngredientData();
    }, [ingredient, fetchIngredientData]);

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
                                // fontSize: '0.8vw',
                                fontSize: '0.8em',
                                color: '#555'
                            }}
                        >
                            {ingredientData.scientificName.replace(/\b\w/g, (char) => char.toUpperCase())}
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
                    {/*<hr*/}
                    {/*    className="separator"*/}
                    {/*    style={{*/}
                    {/*        margin: '1%',*/}
                    {/*        border: 'none',*/}
                    {/*        borderTop: '1px solid #ccc',*/}
                    {/*    }}*/}
                    {/*/>*/}
                </div>
            )}
        </div>
    );
};

export default IngredientCard;
