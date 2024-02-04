import React, {useEffect, useState} from 'react';
import {useIngredientContext} from "../stateManager/IngredientContext";
import {buttonColor, buttonMinusColor, buttonPlusColor, pageColor, randomTempColor} from "../stateManager/lightMode";
import CollapsibleComponent from '../components/collapsibleComponent';
import MoleculesCard from "../components/cards/moleculesCard";
import SimilarIngredientsCard from "../components/cards/similarIngredientsCard";
import {FaMinus, FaPlus} from 'react-icons/fa';
import SingleIngredientFlavorCard from "../components/cards/singleIngredientFlavorCard";
import flavordb from "../data/flavordb.json";
import moleculesData from "../data/molecules.json";

const IngredientPage = ({ingredient}) => {
    // const imageURL = `https://cosylab.iiitd.edu.in/flavordb/static/entities_images/${ingredient.entityID}.jpg`;
    const imageURL = `/images/${ingredient.entityID}.jpg`;
    const [ingredientData, setIngredientData] = useState(null);
    const [sharedMoleculeCounts, setSharedMoleculeCounts] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const {selectedIngredients, selectIngredient, unselectIngredient} = useIngredientContext();
    const [isSuggestedCardCollapsed, setSuggestedCardCollapsed] = useState(true);
    const [isMoleculeCardCollapsed, setMoleculeCardCollapsed] = useState(true);
    const [isFlavorCardCollapsed, setFlavorCardCollapsed] = useState(true);
    const [allMolecules, setAllMolecules] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    const handleAddToComparison = () => {
        if (selectedIngredients.includes(ingredient)) {
            unselectIngredient(ingredient);
        } else {
            selectIngredient(ingredient);
        }
    };

    useEffect(() => {
        const fetchIngredientData = async () => {
            const entity_id = ingredient.entityID;

            try {
                const flavorData = flavordb.find(item => item.entityID === entity_id);
                if (flavorData) {
                    setIngredientData(flavorData);
                } else {
                    setErrorMessage('Ingredient not found');
                    return;
                }

                const molecules_list_str = flavorData.molecules;
                const molecules_list = molecules_list_str.match(/\d+/g);
                const moleculesDataFiltered = moleculesData.filter(item => molecules_list.includes(item.pubchemID.toString()));
                const moleculesDataFormatted = moleculesDataFiltered.map(item => ({
                    pubchemID: item.pubchemID,
                    commonName: item.commonName,
                    flavorProfile: Array.from(new Set(item.flavorProfile.match(/\w+/g))) // Extract words and convert to an array
                }));

                setAllMolecules({entityID: entity_id, molecules: moleculesDataFormatted});

                const molecules_entity_id = new Set(molecules_list);
                const shared_molecule_count_dict = {};

                flavordb.forEach(({alias: alias_row, molecules: molecules_row}) => {
                    if (alias_row === flavorData.alias) {
                        return;  // Skip the current row
                    }
                    const shared_molecule_count = Array.from(new Set([...molecules_entity_id].filter(x => molecules_row.includes(x)))).length;
                    shared_molecule_count_dict[alias_row] = shared_molecule_count;
                });

                const sortedEntries = Object.entries(shared_molecule_count_dict).sort(([, countA], [, countB]) => countB - countA);
                setSharedMoleculeCounts(sortedEntries);

            } catch (error) {
                console.error('Error fetching or parsing data:', error);
                setErrorMessage('Error fetching data');
            }
            setFadeIn(true);
        };
        fetchIngredientData().then(() => {
        }).catch(error => {
            console.error('Error in useEffect:', error);
        });
    }, [ingredient]);

    return (
        <div style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: pageColor,
            // backgroundColor: 'blue',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '8px',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity .3s ease-in-out',
        }}>
            {errorMessage && <p>{errorMessage}</p>}
            {ingredientData && (
                <div style={{
                    opacity: fadeIn ? 1 : 0,
                    transition: 'opacity .5s ease-in-out',
                    width: '100%',
                    height: '100%',
                    overflowY: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        justifyContent: 'center',
                        // boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                    }}>
                        <div style={{
                            // backgroundColor: 'pink',
                            marginTop: '5px',
                            width: '75px',
                            height: '75px',
                            overflow: 'hidden',
                        }}>
                            <img
                                src={imageURL}
                                alt={`Ingredient ${ingredient.alias}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    // boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                                    // borderRadius: '8px',
                                    // borderRadius: '8px 8px 0 0',
                                }}
                            />
                        </div>
                        <div style={{
                            textAlign: 'center',
                            marginTop: '1%',
                            marginBottom: '1%',
                            marginLeft: '5%',
                            marginRight: '5%',
                            // backgroundColor: 'blue',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <div className="alias" style={{
                                fontWeight: 'bold',
                                fontSize: '1.5em',
                                marginBottom: '5%',
                                // backgroundColor: 'yellow',
                            }}>
                                {ingredientData.alias.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </div>
                            <div className="scientific-name" style={{
                                fontSize: '0.8em',
                                color: '#555',
                                // backgroundColor: 'yellow',
                            }}>
                                {ingredientData.scientificName !== null
                                    ? ingredientData.scientificName.replace(/\b\w/g, (char) => char.toUpperCase())
                                    : 'N/A'
                                }
                            </div>
                            <div className="category" style={{
                                fontSize: '0.8em',
                                color: '#555',
                                // backgroundColor: 'yellow',
                            }}>
                                {ingredientData.category !== null
                                    ? ingredientData.category.replace(/\b\w/g, (char) => char.toUpperCase())
                                    : 'N/A'
                                }
                            </div>
                        </div>
                        <div
                            style={{
                                // backgroundColor: 'green',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <button
                                onClick={handleAddToComparison}
                                style={{
                                    margin: '1%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: selectedIngredients.includes(ingredient) ? buttonMinusColor : buttonPlusColor,
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {selectedIngredients.includes(ingredient) ? <FaMinus/> : <FaPlus/>}
                                {/*<FaPlus/>*/}
                            </button>
                        </div>
                    </div>
                    <hr
                        className="separator"
                        style={{
                            border: 'none',
                            borderTop: '1px solid #ccc',
                            width: '100%',
                        }}
                    />
                    <div style={{
                        // backgroundColor: 'yellow',
                        padding: '1%',
                        paddingTop: '2%',
                        overflow: 'auto',
                    }}>
                        <CollapsibleComponent
                            title="Molecules"
                            isCollapsed={isMoleculeCardCollapsed}
                            onToggle={() => setMoleculeCardCollapsed(!isMoleculeCardCollapsed)}
                        >
                            {!isMoleculeCardCollapsed && (
                                <MoleculesCard moleculeData={allMolecules}/>
                            )}
                        </CollapsibleComponent>
                        <CollapsibleComponent
                            title="Flavor Profiles"
                            isCollapsed={isFlavorCardCollapsed}
                            onToggle={() => setFlavorCardCollapsed(!isFlavorCardCollapsed)}
                        >
                            {!isFlavorCardCollapsed && (
                                <SingleIngredientFlavorCard entity_id={ingredient.entityID}/>
                            )}
                        </CollapsibleComponent>
                        <CollapsibleComponent
                            title="Ingredients With Shared Molecules (Name: Count)"
                            isCollapsed={isSuggestedCardCollapsed}
                            onToggle={() => setSuggestedCardCollapsed(!isSuggestedCardCollapsed)}
                        >
                            {!isSuggestedCardCollapsed && (
                                <SimilarIngredientsCard sharedMoleculeCounts={sharedMoleculeCounts}/>
                            )}
                        </CollapsibleComponent>
                    </div>
                </div>
            )}
        </div>
    );

};

export default IngredientPage;
