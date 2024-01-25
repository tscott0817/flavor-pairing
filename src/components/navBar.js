import {navBarColor, searchBarColor} from "../colors";
import {IoSearchOutline} from "react-icons/io5";
import {TbLetterX} from "react-icons/tb";
import React from "react";

const NavBar = ({searchQuery, handleSearchQueryChange}) => {

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
                backgroundColor: navBarColor,
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                zIndex: 1,
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
                padding: '0 10px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '25px',
                    overflow: 'hidden',
                    backgroundColor: searchBarColor,
                    height: '75%',
                    width: '30%',
                    minWidth: '400px',
                    // padding: '8px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                    margin: 'auto',
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
                        color: '#333',
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
                        backgroundColor: searchBarColor,
                        fontSize: '16px',
                        color: 'rgba(50, 50, 50, 0.8)',
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
                    }}
                    onClick={() => eraseInputText()}
                >
                    <TbLetterX
                        style={{
                            width: '20px',
                            height: '20px',
                            color: '#555',
                        }}
                    />
                </button>
            </div>
        </div>
    )
}

export default NavBar;