import React, { useState, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveRadar } from "@nivo/radar";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { buttonBackgroundColor, sectionItemColor } from "../../stateManager/lightMode";

const SharedIngredientFlavorCard = ({ sharedMolecules }) => {
    const [showBarChart, setShowBarChart] = useState(true);
    const [showTop25, setShowTop25] = useState(true);
    const chartContainerRef = useRef(null);

    const toggleShowTop25 = () => {
        setShowTop25(!showTop25);
    };

    const toggleChart = () => {
        setShowBarChart(!showBarChart);
    };

    const getChartData = () => {
        const allFlavorProfiles = getAllFlavors();

        const flavorCounts = allFlavorProfiles.reduce((acc, flavor) => {
            acc[flavor] = (acc[flavor] || 0) + 1;
            return acc;
        }, {});

        const flavorArray = Object.entries(flavorCounts).map(([flavor, count]) => ({ flavor, count }));

        // Sort the flavor array first by count (descending), then alphabetically
        flavorArray.sort((a, b) => {
            if (a.count !== b.count) {
                return b.count - a.count; // Sort by count in descending order
            }
            return a.flavor.localeCompare(b.flavor);
        });

        return showTop25 ? flavorArray.slice(0, 25) : flavorArray;
    };

    const getAllFlavors = () => {
        return sharedMolecules.flatMap((molecule) => {
            const flavorMatches = molecule.flavorProfile.match(/'([^']*)'/g);
            return flavorMatches ? flavorMatches.map((match) => match.replace(/'/g, '').trim()) : [];
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <div style={{textAlign: "center", marginTop: "10px", display: "flex", flexDirection: "column"}}>
                <button onClick={toggleChart} style={{
                    width: '20%',
                    marginLeft: '80%',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontFamily: 'Roboto, sans-serif',
                }}>
                    <span style={{
                        color: '#555',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        transition: 'color 0.3s ease'
                    }}>
                        {showBarChart ? 'Switch to Radar Chart' : 'Switch to Bar Chart'}
                    </span>
                </button>
                <button onClick={toggleShowTop25} style={{
                    width: '20%',
                    marginLeft: '80%',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontFamily: 'Roboto, sans-serif',
                }}>
                    <span style={{
                        color: '#555',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        transition: 'color 0.3s ease'
                    }}>
                        {showTop25 ? 'Show All Flavors' : 'Show Top 20 Flavors'}
                    </span>
                </button>
            </div>
            <div
                ref={chartContainerRef}
                style={{
                    position: "relative",
                    minWidth: "25vw",
                    width: "100%",
                    height: "50vh",
                    borderRadius: "8px",
                    backgroundColor: sectionItemColor,
                    overflow: "visible",
                }}
            >
                {showBarChart ? (
                    <ResponsiveBar
                        data={getChartData()}
                        keys={["count"]}
                        indexBy="flavor"
                        margin={{top: 60, right: 80, bottom: 60, left: 80}}
                        // colors={["#FF5733", "#33FF57", "#5733FF", "#33B8FF"]}
                        colors={'#f47560'}
                        borderColor={{from: "color"}}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 45,
                            // legend: "Flavors",
                            legendPosition: "middle",
                            legendOffset: 40,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            // legend: "Occurrences",
                            legendPosition: "middle",
                            legendOffset: -50,
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                ) : (
                    <ResponsiveRadar
                        data={getChartData()}
                        keys={["count"]}
                        indexBy="flavor"
                        margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
                        borderColor={{ from: "color" }}
                        gridLabelOffset={36}
                        dotSize={10}
                        dotColor={{ theme: "background" }}
                        dotBorderWidth={2}
                        colors={["#FF5733", "#33FF57", "#5733FF", "#33B8FF"]}
                        blendMode="multiply"
                        motionConfig="wobbly"
                        animate={true}
                    />
                )}
            </div>
        </div>
    );
};

export default SharedIngredientFlavorCard;
