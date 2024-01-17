import React, {useEffect, useState} from "react";
import SharedMoleculesCardSingle from "../components/cards/sharedMoleculeCardSingle";
import IngredientCombinedCard from "../components/cards/ingredientCombinedCard";
import ResultsCard from "../components/cards/resultsCard";
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor} from "../colors";
import {FaArrowDown, FaArrowUp, FaArrowRight} from "react-icons/fa";
import CollapsibleComponent from "../components/collapsibleComponent";
import SharedIngredientFlavorCard from "../components/cards/sharedIngredientFlavorCard";
import moleculesData from "../data/molecules.json";

// TODO: Prop drilling with ingredient1 and ingredient2
//  - It goes from App.js -> Here -> ResultsCard -> IngredientCard
//  - Need to use CONTEXT instead to make the ingredients global values
const CompareIngredientsPage = ({ingredient1, ingredient2}) => {
    const [sharedMolecules, setSharedMolecules] = useState([]);
    const [fadeIn, setFadeIn] = useState(false);
    const [isMoleculeCardCollapsed, setMoleculeCardCollapsed] = useState(true);
    const [isFlavorCardCollapsed, setFlavorCardCollapsed] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Use the 'entityID' directly from the data
            const entityID1 = ingredient1.entityID || '';
            const entityID2 = ingredient2.entityID || '';

            try {

                // Use the entityID to get the molecules for each ingredient
                const ingredient1Molecules = ingredient1.molecules.match(/\{([^}]+)\}/)?.[1].replace(/'/g, '');
                const ingredient2Molecules = ingredient2.molecules.match(/\{([^}]+)\}/)?.[1].replace(/'/g, '');

                // Get the intersection of the two sets of molecules
                const ingredient1MoleculesSet = new Set(ingredient1Molecules ? ingredient1Molecules.split(',').map(Number) : []);
                const ingredient2MoleculesSet = new Set(ingredient2Molecules ? ingredient2Molecules.split(',').map(Number) : []);
                const sharedMoleculesSet = new Set([...ingredient1MoleculesSet].filter(x => ingredient2MoleculesSet.has(x)));
                const sharedMolecules = [...sharedMoleculesSet];
                console.log('sharedMolecules', sharedMolecules)

                // Get the details for each molecule
                const sharedMoleculesDetails = sharedMolecules.map(pubchemID => moleculesData.find(molecule => molecule.pubchemID === pubchemID));
                console.log('sharedMoleculesDetails', sharedMoleculesDetails)

                // // The molecules are the pubhchemID's in moleculesData, fill a list with all data row matching a pubchemID
                // const ingredient1MoleculesData = ingredient1Molecules ? ingredient1Molecules.split(',').map(Number).map(pubchemID => moleculesData.find(molecule => molecule.pubchemID === pubchemID)) : [];
                // const ingredient2MoleculesData = ingredient2Molecules ? ingredient2Molecules.split(',').map(Number).map(pubchemID => moleculesData.find(molecule => molecule.pubchemID === pubchemID)) : [];
                // console.log('ingredient1MoleculesData', ingredient1MoleculesData)
                // console.log('ingredient2MoleculesData', ingredient2MoleculesData)

                setSharedMolecules(sharedMoleculesDetails);
            } catch (error) {
                console.error("Error fetching shared molecules:", error);
            }

            // Trigger fade-in effect
            setFadeIn(true);
        };

        fetchData(); // Call fetchData when the component mounts
    }, [ingredient1, ingredient2, setFadeIn, setSharedMolecules]);

    console.log('Shared Molecules: ', sharedMolecules)
    return (
        <div style={{
            fontFamily: 'Roboto, sans-serif',
            backgroundColor: pageColor,
            // backgroundColor: 'blue',
            width: '100%',
            // minWidth: '900px', // TODO: Make this a proportion of the users screen size instead of hardcoding
            height: '100%',
            margin: '0 auto',
            // padding: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            // paddingLeft: '1%',
            // padingRight: '1%',
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
                <IngredientCombinedCard ingredient1={ingredient1} ingredient2={ingredient2}/>
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
                // marginTop: '1%',
                // backgroundColor: 'yellow',
                overflowY: 'auto',
                // padding: '1%',
                paddingLeft: '1%',
                paddingRight: '1%',
                // paddingTop: '2%',
                paddingBottom: '10%',
                overflow: 'auto',
            }}>
                <ResultsCard ingredient1={ingredient1} ingredient2={ingredient2} sharedMolecules={sharedMolecules}/>
                <CollapsibleComponent
                    title="Shared Molecules"
                    isCollapsed={isMoleculeCardCollapsed}
                    onToggle={() => setMoleculeCardCollapsed(!isMoleculeCardCollapsed)}
                >
                    <SharedMoleculesCardSingle moleculeData={sharedMolecules}/>
                </CollapsibleComponent>
                <CollapsibleComponent
                    title="Associated Flavor Profiles"
                    isCollapsed={isFlavorCardCollapsed}
                    onToggle={() => setFlavorCardCollapsed(!isFlavorCardCollapsed)}
                >
                    <SharedIngredientFlavorCard sharedMolecules={sharedMolecules}/>
                </CollapsibleComponent>
            </div>
        </div>
    );
}

export default CompareIngredientsPage;