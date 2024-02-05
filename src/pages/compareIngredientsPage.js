import React, {useEffect, useState} from "react";
import SharedMoleculesCardSingle from "../components/cards/sharedMoleculeCardSingle";
import IngredientCombinedCard from "../components/cards/ingredientCombinedCard";
import ResultsCard from "../components/cards/resultsCard";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../stateManager/lightMode";
import CollapsibleComponent from "../components/collapsibleComponent";
import SharedIngredientFlavorCard from "../components/cards/sharedIngredientFlavorCard";
import moleculesData from "../data/molecules.json";
import {useIngredientContext} from "../stateManager/IngredientContext";
import { useThemeContext } from '../stateManager/ThemeContext';
import * as lightColors from "../stateManager/lightMode";
import * as darkColors from "../stateManager/darkMode";

const CompareIngredientsPage = () => {
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [fadeIn, setFadeIn] = useState(false);
    const [isMoleculeCardCollapsed, setMoleculeCardCollapsed] = useState(true);
    const [isFlavorCardCollapsed, setFlavorCardCollapsed] = useState(true);
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const ingredient1 = selectedIngredients[0];
    const ingredient2 = selectedIngredients[1];
    const {theme} = useThemeContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ingredient1Molecules = ingredient1.molecules.match(/\{([^}]+)\}/)?.[1].replace(/'/g, '');
                const ingredient2Molecules = ingredient2.molecules.match(/\{([^}]+)\}/)?.[1].replace(/'/g, '');

                // Get the intersection of the two sets of molecules
                const ingredient1MoleculesSet = new Set(ingredient1Molecules ? ingredient1Molecules.split(',').map(Number) : []);
                const ingredient2MoleculesSet = new Set(ingredient2Molecules ? ingredient2Molecules.split(',').map(Number) : []);
                const sharedMoleculesSet = new Set([...ingredient1MoleculesSet].filter(x => ingredient2MoleculesSet.has(x)));
                const sharedMolecules = [...sharedMoleculesSet];

                // Get the details for each molecule
                const sharedMoleculesDetails = sharedMolecules.map(pubchemID => moleculesData.find(molecule => molecule.pubchemID === pubchemID));

                setSharedMolecules(sharedMoleculesDetails);
            } catch (error) {
                console.error("Error fetching shared molecules:", error);
            }
            setFadeIn(true);
        };

        fetchData(); // Call fetchData when the component mounts
    }, [ingredient1, ingredient2, setFadeIn, setSharedMolecules]);

    return (
        <div style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: theme === lightColors ? lightColors.pageColor : darkColors.pageColor,
            // backgroundColor: 'blue',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderRadius: '8px',
            // border: '1px solid #000',
            // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            overflowY: 'hidden',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity .3s ease-in-out',

        }}>
            <div style={{
                // backgroundColor: 'red',
            }}>
                <IngredientCombinedCard />
                <hr
                    className="separator"
                    style={{
                        // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', // Adjust values as needed
                        border: 'none',
                        borderTop: '1px solid #ccc',
                    }}
                />
            </div>
            <div style={{
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity .5s ease-in-out',
                width: '100%',
                height: '100%',
                // backgroundColor: 'yellow',
                overflowY: 'auto',
                paddingLeft: '1%',
                paddingRight: '1%',
                paddingBottom: '12%',
                overflow: 'auto',
            }}>
                <ResultsCard sharedMolecules={sharedMolecules}/>
                <CollapsibleComponent
                    title="Shared Molecules"
                    isCollapsed={isMoleculeCardCollapsed}
                    onToggle={() => setMoleculeCardCollapsed(!isMoleculeCardCollapsed)}
                >
                    {!isMoleculeCardCollapsed && (
                        <SharedMoleculesCardSingle sharedMolecules={sharedMolecules}/>
                    )}
                </CollapsibleComponent>
                <CollapsibleComponent
                    title="Associated Flavor Profiles"
                    isCollapsed={isFlavorCardCollapsed}
                    onToggle={() => setFlavorCardCollapsed(!isFlavorCardCollapsed)}
                >
                    {!isFlavorCardCollapsed && (
                        <SharedIngredientFlavorCard sharedMolecules={sharedMolecules}/>
                    )}
                </CollapsibleComponent>
            </div>
        </div>
    );
}

export default CompareIngredientsPage;