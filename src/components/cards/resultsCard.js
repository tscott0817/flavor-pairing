import React from "react";
import {ResponsiveRadialBar} from '@nivo/radial-bar';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, randomTempColor2} from "../../colors";
import NumberLine from "../charts/numberLine";
import {FaArrowRight} from "react-icons/fa";
import {useIngredientContext} from "../../stateManager/IngredientContext";

const ResultsCard = ({sharedMolecules}) => {
    console.log("Results Card");
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const ingredient1 = selectedIngredients[0];
    const ingredient2 = selectedIngredients[1];
    const ingredient1MoleculeCount = getMoleculesCount({ingredient: ingredient1});
    const ingredient2MoleculeCount = getMoleculesCount({ingredient: ingredient2});
    const moleculesCount = ingredient1MoleculeCount + ingredient2MoleculeCount;

    const moleculesContent1 = ingredient1.molecules.match(/\{([^}]+)\}/)?.[1].replace(/'/g, '');
    const moleculesArray1 = moleculesContent1 ? moleculesContent1.split(',').map(Number) : [];
    const moleculesSet1 = new Set(moleculesArray1);

    const moleculesContent2 = ingredient2.molecules.match(/\{([^}]+)\}/)?.[1].replace(/'/g, '');
    const moleculesArray2 = moleculesContent2 ? moleculesContent2.split(',').map(Number) : [];
    const moleculesSet2 = new Set(moleculesArray2);

    const intersectionSize = sharedMolecules.length;
    const unionSize = moleculesSet1.size + moleculesSet2.size - intersectionSize;
    const jaccardSimilarity = intersectionSize / unionSize;

    const score = jaccardSimilarity * 100;
    const jaccardFinalScore = parseFloat(score.toFixed(2));

    let resultText;
    if (jaccardFinalScore <= 0) {
        resultText = 'These ingredients may contrast too much or there is a lack of data';
    } else if (jaccardFinalScore > 0 && jaccardFinalScore < 10) {
        resultText = 'These ingredients may be good as accents flavors';
    } else if (jaccardFinalScore >= 10 && jaccardFinalScore < 25) {
        resultText = 'These ingredients may be good in small amounts';
    } else if (jaccardFinalScore >= 25 && jaccardFinalScore < 75) {
        resultText = 'These ingredients may work well in moderate to large amounts';
    } else if (jaccardFinalScore >= 75 && jaccardFinalScore < 100) {
        resultText = 'These ingredients are very similar, but may be good in small amounts';
    } else {
        resultText = "These ingredients are either too similar or there is a lack of data";
    }

    return (
        <div style={{
            // backgroundColor: 'orange',
            // padding: '2%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                // backgroundColor: 'purple',
                borderRadius: '8px',
                padding: '2%',
                width: '100%',
                height: '400px',
                minHeight: '350px',
                justifyContent: 'center',
            }}>
                {/*<h2 style={{fontSize: '1.25em', color: '#555'}}>Similarity Score</h2>*/}
                <div style={{
                    // backgroundColor: 'red',
                    minWidth: '25vw',
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ResponsiveRadialBar
                        data={[
                            {
                                id: '',
                                data: [{
                                    x: ingredient1.alias.replace(/\b\w/g, (char) => char.toUpperCase()),
                                    y: ingredient1MoleculeCount
                                }],
                            },
                            {
                                id: ' ',
                                data: [{
                                    x: ingredient2.alias.replace(/\b\w/g, (char) => char.toUpperCase()),
                                    y: ingredient2MoleculeCount
                                }],
                            },
                            {
                                id: '  ',
                                data: [{
                                    x: 'Shared',
                                    y: sharedMolecules.length
                                }],
                            },
                        ]}
                        keys={['value']}
                        indexBy="id"
                        innerRadius={0.5}
                        startAngle={-180}  // Adjusted to make it a full circle
                        endAngle={180}  // Adjusted to make it a full circle
                        enableGridX={false}
                        enableGridY={false}
                        valueFormat=">-.2f"
                        padding={0.4}
                        maxValue={moleculesCount}
                        cornerRadius={2}
                        margin={{top: 40, right: 0, bottom: 40, left: 0}}
                        radialAxisStart={{tickSize: 5, tickPadding: 5, tickRotation: 0}}
                        circularAxisOuter={{tickSize: 5, tickPadding: 12, tickRotation: 0}}
                        legends={[
                            {
                                anchor: 'top-right',
                                direction: 'column',
                                justify: false,
                                translateX: 0,
                                translateY: -25,
                                itemsSpacing: 6,
                                itemDirection: 'right-to-left',
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'square',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                        colors={{scheme: 'nivo'}}
                    />
                    <div style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', color: '#777'}}>
                        <p style={{fontSize: '1.25em'}}>{jaccardFinalScore}%</p>
                        {/*<p style={{fontSize: '.75em'}}>Similar</p>*/}
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: 50,
                        left: 0,
                        transform: 'translateY(-50%)',
                        color: '#777',
                        textAlign: 'left'
                    }}>
                        <p style={{fontSize: '0.8em', marginBottom: '10px'}}>
                            <strong>{ingredient1MoleculeCount}</strong> Flavor Molecules Found
                            In <strong>{ingredient1.alias.replace(/\b\w/g, (char) => char.toUpperCase())}</strong></p>
                        <p style={{fontSize: '0.8em', marginBottom: '10px'}}>
                            <strong>{ingredient2MoleculeCount}</strong> Flavor Molecules Found
                            In <strong>{ingredient2.alias.replace(/\b\w/g, (char) => char.toUpperCase())}</strong></p>
                        {/*<p style={{fontSize: '0.8em', marginBottom: '10px'}}>*/}
                        {/*    <strong>{ingredient1MoleculeCount + ingredient2MoleculeCount}</strong> Total Flavor*/}
                        {/*    Molecules</p>*/}
                        <p style={{fontSize: '0.8em', marginBottom: '10px'}}><strong>{intersectionSize}</strong> Flavor
                            Molecules Are Shared</p>
                        {/*<p style={{fontSize: '.75em'}}>Similar</p>*/}
                    </div>
                    {/*<div style={{position: 'absolute', top: 10, right: 0, color: '#777'}}>*/}
                    {/*    <a href="https://en.wikipedia.org/wiki/Jaccard_index" target="_blank"*/}
                    {/*       style={{*/}
                    {/*        textDecoration: 'none',*/}
                    {/*        fontSize: '.8em',*/}
                    {/*    }}>*/}
                    {/*        How is this calculated? <FaArrowRight/>*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div style={{
                // backgroundColor: 'green',
                borderRadius: '8px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#555',
            }}>
                <h2 style={{fontSize: '1.5em'}}>{resultText}</h2>
                <NumberLine percentage={jaccardFinalScore}/>
            </div>
        </div>
    );
}

const getMoleculesCount = ({ingredient}) => {
    // Convert the string representation of the set to a JavaScript array
    const moleculesArray = ingredient.molecules
        .replace(/{/g, '[')
        .replace(/}/g, ']')
        .replace(/'/g, '"');

    // Parse the array
    const moleculesSet = new Set(JSON.parse(moleculesArray));

    // Get the size of the set
    return moleculesSet.size;
}

export default ResultsCard;