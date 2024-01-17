import React, {useEffect, useState, useRef} from "react";
import {ResponsiveRadar} from "@nivo/radar";
import {
    windowColor,
    pageColor,
    pageSectionColor,
    sectionItemColor,
    mainAppColor,
} from "../../colors";
import {MdFullscreen, MdFullscreenExit} from "react-icons/md";
import {buttonBackgroundColor} from "../../colors";

const SingleIngredientFlavorCard = ({entity_id}) => {
    const [flavorData, setFlavorData] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const chartContainerRef = useRef(null);
    const [showAllFlavors, setShowAllFlavors] = useState(false); // New state for the checkbox

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch(`http://localhost:5000/api/get_flavor_info/${entity_id}`)
            .then((response) => response.json())
            .then((data) => setFlavorData(data))
            .catch((error) => console.error("Error fetching flavor data:", error));
    }, [entity_id]);

    if (!flavorData) {
        return <div>No radar data available.</div>;
    }

    // Count the occurrences of each flavor
    const flavorCounts = countFlavorProfiles(flavorData.all_flavor_profiles);

    // Convert the counts into an array of objects for sorting
    const flavorListData = Object.entries(flavorCounts).map(
        ([flavorProfile, count]) => ({
            flavorProfile,
            count,
        })
    );

    flavorListData.sort((a, b) => b.count - a.count);
    const topFlavors = flavorListData.slice(0, 25);
    const radarChartData = topFlavors.map(({flavorProfile, count}) => ({
        flavor: flavorProfile,
        Occurrences: count,
    }));

    // TODO: Not sure I even like having this (especially since i think it is browser specific)
    const toggleFullScreen = () => {
        const chartContainer = chartContainerRef.current;

        if (chartContainer) {
            if (!isFullScreen) {
                if (chartContainer.requestFullscreen) {
                    chartContainer.requestFullscreen();
                } else if (chartContainer.mozRequestFullScreen) {
                    chartContainer.mozRequestFullScreen();
                } else if (chartContainer.webkitRequestFullscreen) {
                    chartContainer.webkitRequestFullscreen();
                } else if (chartContainer.msRequestFullscreen) {
                    chartContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }

            setIsFullScreen(!isFullScreen);
        }
    };

    const toggleShowAllFlavors = () => {
        setShowAllFlavors(!showAllFlavors);
    };

    const getRadarChartData = () => {
        const flavorCounts = countFlavorProfiles(flavorData.all_flavor_profiles);
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
            const topFlavors = flavorListData.slice(0, 25);
            return topFlavors.map(({flavorProfile, count}) => ({
                flavor: flavorProfile,
                Occurrences: count,
            }));
        }
    };

    return (
        <div style={{display: "flex", borderRadius: "8px", justifyContent: "center", alignItems: "center"}}>
            <div
                ref={chartContainerRef}
                style={{
                    position: "relative",
                    minWidth: "25vw",
                    width: "100%",
                    height: "50vh",
                    marginBottom: '10px',
                    borderRadius: "8px",
                    backgroundColor: sectionItemColor,
                    overflow: 'visible',
                }}
            >
                <button
                    onClick={toggleFullScreen}
                    style={{
                        position: "absolute",
                        top: "15px",
                        left: "20px",
                        zIndex: 1,
                        borderRadius: "8px",
                        background: buttonBackgroundColor,
                        border: "none",
                    }}
                >
                    {isFullScreen ? (
                        <MdFullscreenExit size={30}/>
                    ) : (
                        <MdFullscreen size={30}/>
                    )}
                </button>
                <div style={{
                    position: "absolute",
                    top: 20,
                    right: 25,
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center"
                }}>
                    <input
                        type="checkbox"
                        id="showAllFlavorsCheckbox"
                        checked={showAllFlavors}
                        onChange={toggleShowAllFlavors}
                        style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "4px",
                            background: 'lightgrey',
                            border: "none",
                            cursor: 'pointer',
                            marginRight: '8px',
                        }}
                    />
                    <label htmlFor="showAllFlavorsCheckbox" style={{
                        cursor: 'pointer',
                        fontSize: '.8em',
                    }}>
                        Show All Flavors
                    </label>
                </div>
                <ResponsiveRadar
                    data={getRadarChartData()}
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
                />
            </div>
            {/*<div*/}
            {/*    style={{*/}
            {/*        fontFamily: "Roboto, sans-serif",*/}
            {/*        // backgroundColor: 'blue',*/}
            {/*        position: "relative",*/}
            {/*        minWidth: "25vw",*/}
            {/*        width: "50%",*/}
            {/*        height: "50vh",*/}
            {/*        margin: "1%",*/}
            {/*        // padding: "2%",*/}
            {/*        borderRadius: "8px",*/}
            {/*        overflow: "auto",*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div style={{*/}
            {/*        // backgroundColor: 'green'*/}
            {/*        // gridColumn: "1 / -1"*/}
            {/*    }}>*/}
            {/*        <h2*/}
            {/*            style={{*/}
            {/*                borderBottom: "1px solid #999",*/}
            {/*                // paddingBottom: "0.5em",*/}
            {/*                marginLeft: "5%",*/}
            {/*                width: "90%",*/}
            {/*                marginBottom: "0.5em",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Top Flavor Profiles*/}
            {/*        </h2>*/}
            {/*    </div>*/}
            {/*    <div style={{*/}
            {/*        // backgroundColor: 'red',*/}
            {/*        height: '75%',*/}
            {/*        overflow: "auto",*/}
            {/*        fontSize: "1em",*/}
            {/*        display: "grid",*/}
            {/*        gridTemplateColumns:*/}
            {/*            "repeat(auto-fill, minmax(125px, 1fr))", // Adjust the column width as needed*/}
            {/*        // gridGap: "1em",*/}
            {/*    }}>*/}
            {/*        {radarChartData.length > 0 ? (*/}
            {/*            radarChartData.map((profile, index) => (*/}
            {/*                <div key={index} style={{textAlign: "center"}}>*/}
            {/*                    <p>*/}
            {/*                        {profile.flavor}: {profile.count}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            ))*/}
            {/*        ) : (*/}
            {/*            <p>No Flavor Profiles</p>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

const countFlavorProfiles = (flavorProfiles) => {
    const flavorCounts = {};

    flavorProfiles.forEach((item) => {
        item.flavorProfile.forEach((profile) => {
            const cleanedProfile = profile.replace(/'/g, ""); // Remove single quotes
            if (flavorCounts[cleanedProfile]) {
                flavorCounts[cleanedProfile]++;
            } else {
                flavorCounts[cleanedProfile] = 1;
            }
        });
    });

    return flavorCounts;
};

export default SingleIngredientFlavorCard;
