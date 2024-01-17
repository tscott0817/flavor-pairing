import React, {useState, useRef, useEffect} from "react";
import {ResponsiveRadar} from "@nivo/radar";
import {MdFullscreen, MdFullscreenExit} from "react-icons/md";
import {buttonBackgroundColor, sectionItemColor} from "../../colors";

const SharedIngredientFlavorCard = ({sharedMolecules}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showTop25, setShowTop25] = useState(true);
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const chartContainer = chartContainerRef.current;

        const handleFullScreenChange = () => {
            setIsFullScreen(!!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement));
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('mozfullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
        document.addEventListener('msfullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            document.removeEventListener('msfullscreenchange', handleFullScreenChange);
        };
    }, []);

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

    const toggleShowTop25 = () => {
        setShowTop25(!showTop25);
    };

    const getAllFlavors = () => {
        return sharedMolecules
            .flatMap((molecule) => {
                // Use regex to extract flavors from the string representation of a set
                const flavorMatches = molecule.flavorProfile.match(/'([^']*)'/g);

                // Check if there are matches and return the array of flavors
                return flavorMatches ? flavorMatches.map((match) => match.replace(/'/g, '').trim()) : [];
            });
    };

    const getRadarChartData = () => {
        const allFlavorProfiles = getAllFlavors();

        const flavorCounts = allFlavorProfiles.reduce((acc, flavor) => {
            acc[flavor] = (acc[flavor] || 0) + 1;
            return acc;
        }, {});

        const flavorArray = Object.entries(flavorCounts).map(([flavor, count]) => ({flavor, count}));

        // Sort the flavor array first by count (descending), then alphabetically
        flavorArray.sort((a, b) => {
            if (a.count !== b.count) {
                return b.count - a.count; // Sort by count in descending order
            }
            return a.flavor.localeCompare(b.flavor);
        });

        return showTop25 ? flavorArray.slice(0, 25) : flavorArray;
    };

    const radarChartData = getRadarChartData();

    return (
        <div>
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
                        top: 10,
                        left: 10,
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
                        checked={!showTop25}
                        onChange={toggleShowTop25}
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
                    data={radarChartData.map(({flavor, count}) => ({
                        flavor,
                        Occurrences: count,
                    }))}
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

export default SharedIngredientFlavorCard;
