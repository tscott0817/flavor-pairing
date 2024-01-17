import React from "react";
import {ResponsiveRadialBar} from '@nivo/radial-bar';
import {windowColor, pageColor, pageSectionColor, sectionItemColor, mainAppColor, randomTempColor2} from "../../colors";
import NumberLine from "../charts/numberLine";
import {FaArrowRight} from "react-icons/fa";


// TODO: This component suffers from "Prop drilling"
//  - Meaning that ingredient1, and ingredient 2 are not used in this component
//  - but are passed from the parent component, through this one, and into IngredientCard.
//  - Causes too tight of a coupling between these 4 components
const ResultsCard = ({ingredient1, ingredient2, sharedMolecules}) => {
    console.log("Results Card");
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
        resultText = 'These ingredients may contrast too much';
    } else if (jaccardFinalScore > 0 && jaccardFinalScore < 10) {
        resultText = 'These ingredients may be good as accents';
    } else if (jaccardFinalScore >= 10 && jaccardFinalScore < 25) {
        resultText = 'These ingredients may be good as sides';
    } else if (jaccardFinalScore >= 25 && jaccardFinalScore < 75) {
        resultText = 'These ingredients may work well in large amounts';
    } else if (jaccardFinalScore >= 75 && jaccardFinalScore < 100) {
        resultText = 'These ingredients may be too similar and bland together';
    } else {
        resultText = "These ingredients are either identical or there is a lack of data";
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
                // marginLeft: '2%',
                // marginTop: '1%',
                // marginBottom: '1%',
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
                    // margin: '1%',
                    // marginLeft: '1%',
                    borderRadius: '8px',
                    // border: '1px solid #000',
                    // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    // boxSizing: 'border-box',
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
                                    x: ingredient1.alias.replace(/\b\w/g, (char) => char.toUpperCase()) + ' Flavor Molecules',
                                    y: ingredient1MoleculeCount
                                }],
                            },
                            {
                                id: ' ',
                                data: [{
                                    x: ingredient2.alias.replace(/\b\w/g, (char) => char.toUpperCase()) + ' Flavor Molecules',
                                    y: ingredient2MoleculeCount
                                }],
                            },
                            {
                                id: '  ',
                                data: [{
                                    x: 'Shared flavor molecules',
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
                                anchor: 'top-left',
                                direction: 'column',
                                justify: false,
                                translateX: 25,
                                translateY: -25,
                                itemsSpacing: 6,
                                itemDirection: 'left-to-right',
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
                    {/*<div style={{position: 'absolute', top: 10, right: 0, color: '#777'}}>*/}
                    {/*    <a href="https://en.wikipedia.org/wiki/Jaccard_index" target="_blank"*/}
                    {/*       style={{*/}
                    {/*        textDecoration: 'none',*/}
                    {/*        fontSize: '.8em',*/}
                    {/*    }}>*/}
                    {/*        How is this calculated <FaArrowRight/>*/}
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