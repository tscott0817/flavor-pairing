import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TbLetterX } from "react-icons/tb";
import { useThemeContext } from '../stateManager/ThemeContext';
import * as lightColors from "../stateManager/lightMode";
import * as darkColors from "../stateManager/darkMode";
import {FaSun, FaMoon} from "react-icons/fa";

const NavBar = ({ searchQuery, handleSearchQueryChange }) => {
    const [isHovered, setHovered] = useState(false);
    const { theme, toggleTheme } = useThemeContext();

    const handleSearchInputChange = event => {
        console.log("navbar")
        handleSearchQueryChange(event.target.value);
    };

    const eraseInputText = () => {
        handleSearchQueryChange('');
    }

    return (
        <div
            style={{
                backgroundColor: theme === lightColors ? lightColors.navBarColor : darkColors.navBarColor,
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                zIndex: 1,
                boxShadow: theme === lightColors ? lightColors.glowColorMedium : darkColors.glowColorMedium,
                padding: '0 10px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '25px',
                    // border: theme === lightColors ? 'none' : '1px solid #333',
                    overflow: 'hidden',
                    backgroundColor: theme === lightColors ? lightColors.searchBarColor : darkColors.searchBarColor,
                    height: '70%',
                    width: '30%',
                    minWidth: '400px',
                    // padding: '8px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    boxShadow: theme === lightColors ? lightColors.glowColorThin : darkColors.glowColorThin,
                    // margin: 'auto',
                    marginLeft: '35%',
                }}
            >
                {/* Eyeglass search icon */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '8px',
                    marginLeft: '4px',
                }}>
                    <IoSearchOutline style={{
                        color: theme === lightColors ? '#333' : darkColors.textMedLight,
                        height: '20px',
                        width: '20px',
                    }}/>
                </div>
                <input
                    type="text"
                    placeholder="Search for ingredients..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    style={{
                        border: 'none',
                        outline: 'none',
                        padding: '8px',
                        flex: '1',
                        // borderRadius: '8px',
                        height: '70%',
                        // borderLeft: '1px solid #999',
                        // borderRight: '1px solid #999',
                        borderRadius: '8px',
                        backgroundColor: theme === lightColors ? lightColors.searchBarColor : darkColors.searchBarColor,
                        fontSize: '16px',
                        color: theme === lightColors ? 'rgba(50, 50, 50, 0.8)' : darkColors.textMedLight,
                    }}
                />
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        marginLeft: '4px',
                        marginRight: '4px',
                        position: 'relative',
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <TbLetterX
                        style={{
                            width: '20px',
                            height: '20px',
                            color: theme === lightColors ? '#555' : darkColors.textMedLight,
                        }}
                    />
                    {isHovered && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '25px',
                                height: '25px',
                                borderRadius: '50%',
                                backgroundColor: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fff',
                                fontSize: '16px',
                                cursor: 'pointer',
                            }}
                            onClick={() => eraseInputText()}
                        >
                            <TbLetterX
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    color: theme === lightColors ? '#fff' : lightColors.textMedLight,
                                }}
                            />
                        </div>
                    )}
                </button>
            </div>
            <div style={{cursor: 'pointer', marginRight: '4px'}}>
                {theme === lightColors ? (
                    <FaMoon onClick={toggleTheme} style={{color: lightColors.textMedHeavy, fontSize: '22px', transform: 'scaleX(-1)'}}/>
                ) : (
                    <FaSun onClick={toggleTheme} style={{color: darkColors.textMedHeavy, fontSize: '24px'}}/>
                )}
            </div>
        </div>
    )
}

export default NavBar;
