import React, {useState} from "react";
import {buttonColor, pageSectionColor, sectionItemColor} from "../../colors";

// TODO: Need to remove the hardcoding of the molecule array [0]...
//  - The JSON returned is not that great, but my backend sucks so

// [1] = molecule ID, [1] = molecule name, [2] = common name
// const SharedMoleculesCardSingle = ({ingredientName, moleculeData}) => {
const SharedMoleculesCardSingle = ({moleculeData}) => {
    console.log('Shared Molecules Card');

    const [selectedMolecule, setSelectedMolecule] = useState(null);
    const [moleculeInfo, setMoleculeInfo] = useState(null);
    const [moleculeImage, setMoleculeImage] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleMoleculeClick = async (selected) => {
        try {
            // Fetch molecule info directly
            const infoUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${selected.pubchemID}/json`;
            const infoResponse = await fetch(infoUrl);
            const infoData = await infoResponse.json();

            if (infoResponse.status === 200) {
                const properties = infoData['PC_Compounds'][0].props;

                const moleculeInfo = {
                    'PubChemID': selected.pubchemID,
                    'Properties': {}
                };

                // Extract all properties from the 'props' field
                properties.forEach(prop => {
                    moleculeInfo.Properties[prop['urn']['label']] = prop['value'];
                });

                // Set molecule info state
                setMoleculeInfo(moleculeInfo);

                // Fetch molecule image directly
                const imageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${selected.pubchemID}/PNG`;
                setMoleculeImage(imageUrl);

                // Start fading out and then update the selected molecule and start fading in
                setIsVisible(false);
                setTimeout(() => {
                    setSelectedMolecule(selected);
                    setIsVisible(true);
                }, 500);
            } else {
                // Handle error responses for molecule info
                console.error(`Error retrieving data for PubChem ID ${selected.pubchemID}`);
            }
        } catch (error) {
            // Handle general errors
            console.error(error);
        }
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
                // marginTop: '1%',
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
                    // minHeight: '400px',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    // margin: '1%',
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginLeft: '1%',
                    // padding: '1%',
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
                    // marginTop: '30px',
                    // marginTop: '5%',
                }}>
                    <h2
                        style={{
                            borderBottom: '1px solid #999',
                            marginLeft: '2.5%',
                            width: '95%',
                            // marginBottom: '10px',
                            textAlign: 'center',
                            // backgroundColor: 'red'
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
                    // paddingTop: '10px',
                    padding: '5%',
                    // borderRight: '1px solid #232b2b',
                    // paddingBottom: '50px',
                }}>
                    {moleculeData.length > 0 ? (
                        moleculeData.map((detail, index) => (
                            <div key={index} onClick={() => handleMoleculeClick(detail)}
                                 style={{cursor: 'pointer', marginBottom: '10px', textAlign: 'center'}}>
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
                    // margin: "1%",
                    marginTop: '1%',
                    marginBottom: '1%',
                    marginRight: '1%',
                    // overflow: "auto",
                    overflow: "hidden",
                    fontSize: "1em",
                    // borderLeft: '1px solid #999',
                    // border: "1px solid #000",
                    // boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    // boxSizing: "border-box",
                }}
            >
                {selectedMolecule ? (
                    <div>
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
                                // marginTop: '3%',
                            }}>
                                <div style={{
                                    // marginTop: '1%',
                                }}>
                                    <strong>PubChemID:</strong> {moleculeInfo.PubChemID}
                                </div>
                                {/*<div><strong>Molecular Formula:</strong> {moleculeInfo.Properties["Molecular Formula"].sval}</div>*/}
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
                                <div style={{marginTop: '5%'}}>
                                    <strong>Flavor Profiles:</strong>
                                    {selectedMolecule.flavorProfile
                                        .slice(1, -1)
                                        .split(',')
                                        .map((flavor, index) => (
                                            <div key={index}>
                                                <p>- {flavor.trim().replace(/'/g, '')}</p>
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
                                flexDirection: 'column',  // Stack the items vertically
                                opacity: isVisible ? 1 : 0,
                                transition: "opacity 0.5s ease",
                            }}>
                                {/* Display the image */}
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

                                {/* Link under the image */}
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
                        }}
                    >
                        Click on a molecule to view details
                    </h2>
                )}
            </div>
        </div>
    );
};

export default SharedMoleculesCardSingle;
