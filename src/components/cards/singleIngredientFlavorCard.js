import React, {useEffect, useState, useRef} from "react";
import {ResponsiveBar} from "@nivo/bar";
import {ResponsiveRadar} from "@nivo/radar";
import {
    sectionItemColor,
} from "../../colors";
import {MdFullscreen, MdFullscreenExit} from "react-icons/md";
import flavordbData from "../../data/flavordb.json";
import moleculesData from "../../data/molecules.json";

const SingleIngredientFlavorCard = ({entity_id}) => {
    const [flavorData, setFlavorData] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showBarChart, setShowBarChart] = useState(true); // State to toggle between bar chart and radar chart
    const chartContainerRef = useRef(null);
    const [showAllFlavors, setShowAllFlavors] = useState(false);
    console.log("Flavor Card");

    useEffect(() => {
        const fetchData = () => {
            try {
                const entityData = flavordbData.find(
                    (item) => item.entityID === entity_id
                );
                const moleculeNames = entityData.molecules
                    .match(/\{([^}]+)\}/)?.[1]
                    .replace(/'/g, "");
                const moleculeData = moleculesData.filter((item) =>
                    moleculeNames.includes(item.pubchemID.toString())
                );
                const flavorProfiles = moleculeData.map(
                    (item) => item.flavorProfile
                );

                setFlavorData(flavorProfiles);
            } catch (error) {
                console.error("Error processing data:", error);
            }
        };

        fetchData();
    }, [entity_id]);

    if (!flavorData) {
        return <div>No data available.</div>;
    }

    const flavorCounts = countFlavorProfiles(flavorData);

    const flavorListData = Object.entries(flavorCounts).map(
        ([flavorProfile, count]) => ({
            flavorProfile,
            count,
        })
    );

    flavorListData.sort((a, b) => b.count - a.count);

    const toggleShowAllFlavors = () => {
        setShowAllFlavors(!showAllFlavors);
    };

    const toggleChart = () => {
        setShowBarChart(!showBarChart);
    };

    const getChartData = () => {
        const flavorCounts = countFlavorProfiles(flavorData);
        const flavorListData = Object.entries(flavorCounts).map(
            ([flavorProfile, count]) => ({
                flavorProfile,
                count,
            })
        );

        flavorListData.sort((a, b) => b.count - a.count);

        if (showAllFlavors) {
            return flavorListData.map(({flavorProfile, count}) => ({
                flavor: flavorProfile,
                Occurrences: count,
            }));
        } else {
            const topFlavors = flavorListData.slice(0, 20);
            return topFlavors.map(({flavorProfile, count}) => ({
                flavor: flavorProfile,
                Occurrences: count,
            }));
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
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
                <button onClick={toggleShowAllFlavors} style={{
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
                        {showAllFlavors ? 'Show Top 20 Flavors' : 'Show All Flavors'}
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
                        keys={["Occurrences"]}
                        indexBy="flavor"
                        margin={{top: 60, right: 80, bottom: 60, left: 80}}
                        // colors={["#FF5733", "#33FF57", "#5733FF", "#33B8FF"]}
                        // colors={{scheme: 'nivo'}}
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
                        labelTextColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                        }}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                ) : (
                    <ResponsiveRadar
                        data={getChartData()}
                        keys={["Occurrences"]}
                        indexBy="flavor"
                        margin={{top: 60, right: 80, bottom: 60, left: 80}}
                        borderColor={{from: "color"}}
                        gridLabelOffset={36}
                        dotSize={10}
                        dotColor={{theme: "background"}}
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

const countFlavorProfiles = (flavorProfiles) => {
    const flavorCounts = {};

    flavorProfiles.forEach((item) => {
        const profilesArray = item
            .replace(/[{}']/g, "")
            .split(",")
            .map((profile) => profile.trim());

        profilesArray.forEach((profile) => {
            if (flavorCounts[profile]) {
                flavorCounts[profile]++;
            } else {
                flavorCounts[profile] = 1;
            }
        });
    });

    return flavorCounts;
};

export default SingleIngredientFlavorCard;