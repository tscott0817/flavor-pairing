import React, {useState} from "react";
import {sectionItemColor} from "../../colors";


const SimilarIngredientsCard = ({sharedMoleculeCounts}) => {
    console.log("Similar Ingredients Card");
    return (
        <div
            style={{
                display: 'flex',
                // backgroundColor: 'red',
                height: '100%',
                minHeight: '400px',
                borderRadius: '8px',
                padding: '1%',
                marginBottom: '1%',
            }}
        >
            <div
                style={{
                    backgroundColor: sectionItemColor,
                    minWidth: "25vw",
                    width: "100%",
                    minHeight: '400px',
                    borderRadius: '8px',
                    margin: "1%",
                    paddingTop: "1%",
                    overflow: "hidden",
                    fontSize: "1em",
                }}
            >
                <div style={{
                    columns: '4',
                    columnGap: '20px',
                }}>
                    {sharedMoleculeCounts &&
                        sharedMoleculeCounts
                            .filter(([alias, count]) => count !== 0) // Filter out items with count 0
                            .map(([alias, count]) => (
                                <div key={alias} style={{
                                    marginBottom: '10px',
                                    textAlign: 'left',
                                }}>
                                    <strong>{alias.replace(/\b\w/g, (char) => char.toUpperCase())}</strong>: {count}
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );

}

export default SimilarIngredientsCard;