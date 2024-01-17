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
                // Retrieve molecules for entityID1
                const molecules1 = moleculesData.find(item => item.indexPos === entityID1)?.flavorProfile || [];

                // Retrieve molecules for entityID2
                const molecules2 = moleculesData.find(item => item.indexPos === entityID2)?.flavorProfile || [];

                // Find the intersection of molecule sets
                const sharedMolecules = new Set([...molecules1].filter(value => molecules2.includes(value)));

                if (sharedMolecules.size === 0) {
                    console.error("No shared molecules found.");
                    return;
                }

                // Filter details of shared molecules from the molecules.json file
                const sharedMoleculesDetails = moleculesData.filter(item => sharedMolecules.has(item.flavorProfile));

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