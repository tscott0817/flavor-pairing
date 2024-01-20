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
import flavordbData from "../../data/flavordb.json";
import moleculesData from "../../data/molecules.json";

const SingleIngredientFlavorCard = ({entity_id}) => {
    const [flavorData, setFlavorData] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const chartContainerRef = useRef(null);
    const [showAllFlavors, setShowAllFlavors] = useState(false);
    console.log("Flavor Card");

    useEffect(() => {
        const fetchData = () => {
            try {
                const entityData = flavordbData.find((item) => item.entityID === entity_id);
                const moleculeNames = entityData.molecules.match(/\{([^}]+)\}/)?.[1].replace(/'/g, '');
                const moleculeData = moleculesData.filter((item) => moleculeNames.includes(item.pubchemID.toString()));
                const flavorProfiles = moleculeData.map((item) => item.flavorProfile);

                setFlavorData(flavorProfiles);
            } catch (error) {
                console.error("Error processing data:", error);
            }
        };

        fetchData();
    }, [entity_id]);

    if (!flavorData) {
        return <div>No radar data available.</div>;
    }

    const flavorCounts = countFlavorProfiles(flavorData);

    const flavorListData = Object.entries(flavorCounts).map(
        ([flavorProfile, count]) => ({
            flavorProfile,
            count,
        })
    );

    flavorListData.sort((a, b) => b.count - a.count);

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
                {/*<button*/}
                {/*    onClick={toggleFullScreen}*/}
                {/*    style={{*/}
                {/*        position: "absolute",*/}
                {/*        top: "15px",*/}
                {/*        left: "20px",*/}
                {/*        zIndex: 1,*/}
                {/*        borderRadius: "8px",*/}
                {/*        background: buttonBackgroundColor,*/}
                {/*        border: "none",*/}
                {/*    }}*/}
                {/*>*/}
                {/*    {isFullScreen ? (*/}
                {/*        <MdFullscreenExit size={30}/>*/}
                {/*    ) : (*/}
                {/*        <MdFullscreen size={30}/>*/}
                {/*    )}*/}
                {/*</button>*/}
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
        </div>
    );
};

const countFlavorProfiles = (flavorProfiles) => {
    const flavorCounts = {};

    flavorProfiles.forEach((item) => {
        const profilesArray = item.replace(/[{}']/g, '').split(',').map(profile => profile.trim());

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
