import React, {useEffect, useState} from "react";
import {buttonColor, sectionItemColor} from "../../stateManager/lightMode";
import { useThemeContext } from '../../stateManager/ThemeContext';
import * as lightColors from "../../stateManager/lightMode";
import * as darkColors from "../../stateManager/darkMode";

const MoleculesCard = ({moleculeData}) => {
    const [selectedMolecule, setSelectedMolecule] = useState(null);
    const [moleculeInfo, setMoleculeInfo] = useState(null);
    const [moleculeImage, setMoleculeImage] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const {theme} = useThemeContext();
    console.log("Molecules Card");

    useEffect(() => {
        const fetchData = async () => {
            if (selectedMolecule) {
                setIsLoading(true);
                try {
                    const infoUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${selectedMolecule.pubchemID}/json`;
                    const infoResponse = await fetch(infoUrl);
                    const infoData = await infoResponse.json();

                    if (infoResponse.status === 200) {
                        const properties = infoData['PC_Compounds'][0].props;

                        const moleculeInfo = {
                            'PubChemID': selectedMolecule.pubchemID,
                            'Properties': {}
                        };

                        properties.forEach(prop => {
                            moleculeInfo.Properties[prop['urn']['label']] = prop['value'];
                        });
                        setMoleculeInfo(moleculeInfo);

                        const imageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${selectedMolecule.pubchemID}/PNG`;
                        setMoleculeImage(imageUrl);

                        setIsVisible(false);
                        setTimeout(() => {
                            setIsVisible(true);
                        }, 500);
                    } else {
                        console.error(`Error retrieving data for PubChem ID ${selectedMolecule.pubchemID}`);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [selectedMolecule]);

    const handleMoleculeClick = (selected) => {
        setSelectedMolecule(selected);
    };

    if (moleculeData === null) {
        return <div>No molecule data available.</div>;
    }

    return (
        <div
            style={{
                display: 'flex',
                // backgroundColor: 'red',
                height: '100%',
                minHeight: '400px',
                borderRadius: '8px',
                padding: '1%',
                // border: '1px solid #000',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                // boxSizing: 'border-box',
                marginBottom: '1%',
            }}
        >
            <div
                style={{
                    // fontFamily: 'Roboto, sans-serif',
                    // backgroundColor: 'pink',
                    minWidth: '250px',
                    maxWidth: '20vw',
                    height: '400px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginLeft: '1%',
                    overflow: 'hidden',
                    fontSize: '1em',
                    // border: '1px solid #000',
                    // borderRight: '1px solid #000',
                    // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                    borderRight: '1px solid #999',
                    // boxSizing: 'border-box',
                    textAlign: 'left',
                    zIndex: 1,
                }}
            >
                <div style={{
                    // backgroundColor: 'blue',
                }}>
                    <h2
                        style={{
                            borderBottom: '1px solid #999',
                            marginLeft: '2.5%',
                            width: '95%',
                            textAlign: 'center',
                            // backgroundColor: 'red'
                            color: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
                        }}
                    >
                        Molecules
                    </h2>
                </div>
                <div style={{
                    // backgroundColor: 'green',
                    overflow: 'auto',
                    // height: '93%',
                    height: '370px',
                    padding: '5%',
                }}>
                    {moleculeData.molecules.length > 0 ? (
                        moleculeData.molecules.map((detail, index) => (
                            <div key={index} onClick={() => handleMoleculeClick(detail)}
                                 style={{
                                     cursor: 'pointer',
                                     marginBottom: '10px',
                                     textAlign: 'center',
                                     color: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
                                 }}>
                                <p>{detail.commonName}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Molecules!</p>
                    )}
                </div>
            </div>
            <div
                style={{
                    // fontFamily: "Roboto, sans-serif",
                    // backgroundColor: sectionItemColor,
                    // backgroundColor: 'red',
                    minWidth: "25vw",
                    width: "100%",
                    height: "50vh",
                    minHeight: '400px',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginRight: '1%',
                    overflow: "hidden",
                    fontSize: "1em",
                    // borderLeft: '1px solid #232b2b',
                    // border: "1px solid #000",
                    // boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    // boxSizing: "border-box",
                }}
            >
                {moleculeInfo && selectedMolecule ? (
                    <div style={{
                        color: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
                    }}>
                        <h2
                            style={{
                                borderBottom: "1px solid #999",
                                // paddingBottom: "0.5em",
                                marginLeft: "1%",
                                width: "98%",
                            }}
                        >
                            {selectedMolecule.commonName}
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            // backgroundColor: 'yellow'
                        }}>
                            <div style={{
                                // backgroundColor: 'yellow',
                                overflow: 'hidden',
                                textAlign: 'left',
                                padding: '2%',
                                paddingTop: '2%',
                                opacity: isVisible ? 1 : 0, // Set opacity based on visibility flag
                                transition: "opacity 0.5s ease",
                                // border: '1px solid #000',
                                // borderRadius: '8px',
                                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                                marginLeft: '8%',
                                marginTop: '10px',
                            }}>
                                <div style={{
                                    // backgroundColor: 'blue',
                                }}>
                                    <strong>PubChemID:</strong> {moleculeInfo.PubChemID}
                                </div>
                                <div style={{
                                    marginTop: '5%',
                                }}>
                                    <strong>Molecular Formula:</strong>{" "}
                                    {moleculeInfo.Properties["Molecular Formula"].sval.split("").map((char, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                verticalAlign: /\d/.test(char) ? "sub" : "baseline",
                                                fontSize: /\d/.test(char) ? "75%" : "100%",
                                            }}
                                        >
                                          {char}
                                        </span>
                                    ))}
                                </div>
                                <div style={{
                                    marginTop: '5%',
                                }}>
                                    <strong>Molecular
                                        Weight:</strong> {moleculeInfo.Properties["Molecular Weight"].sval} g/mol
                                </div>
                                <div style={{
                                    marginTop: '5%',
                                }}>
                                    <strong>Flavor Profiles:</strong>
                                    {(Array.isArray(selectedMolecule.flavorProfile) ? selectedMolecule.flavorProfile : [selectedMolecule.flavorProfile]).map((flavor, index) => (
                                        <div key={index}>
                                            <p>- {flavor}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                // backgroundColor: 'red',
                                padding: '2%',
                                display: 'flex',
                                marginLeft: '15%',
                                marginTop: '15px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 0.5s ease",
                            }}>
                                {moleculeImage && (
                                    <img
                                        src={moleculeImage}
                                        alt={`Molecule: ${selectedMolecule.commonName}`}
                                        style={{
                                            width: '225px',
                                            height: '225px',
                                            borderRadius: 8,
                                            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                                        }}
                                    />
                                )}
                                <div style={{marginTop: '10px'}}>
                                    <button
                                        style={{
                                            marginTop: '40px',
                                            padding: '10px',
                                            backgroundColor: buttonColor,
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${moleculeInfo.PubChemID}`, '_blank')}
                                    >
                                        View on PubChem
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2
                        style={{
                            position: 'relative',
                            top: '50%',
                            // color: '#333',
                            color: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
                        }}
                    >
                        {isLoading ? <p>Loading...</p> : <p>Click on a molecule to view details</p>}
                    </h2>
                )}
            </div>
        </div>
    );
};

export default MoleculesCard;
