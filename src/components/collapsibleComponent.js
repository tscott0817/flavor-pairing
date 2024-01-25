import React, { useState } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';

const CollapsibleComponent = ({ title, children, isCollapsed, onToggle }) => {
    const [contentHeight, setContentHeight] = useState(isCollapsed ? 0 : 'auto');

    const toggleCollapse = () => {
        const newHeight = contentHeight === 'auto' ? 0 : 'auto';
        setContentHeight(newHeight);
        onToggle();
    };

    return (
        <div>
            <div
                style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc', // Light gray border
                    padding: '6px 16px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.3s',
                    backgroundColor: isCollapsed ? '#ddd' : '#f0f0f0', // Light gray background
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                }}
                onClick={toggleCollapse}
            >
                <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{title}</div> {/* Dark text color */}
                {isCollapsed ? <FaAngleRight style={{ color: '#333' }} /> : <FaAngleDown style={{ color: '#333' }} />} {/* Dark icon color */}
            </div>
            <div
                style={{
                    overflow: 'hidden',
                    height: contentHeight,
                    opacity: isCollapsed ? 0 : 1,
                    transition: 'height 0.4s ease-in-out, opacity 0.4s ease-in-out',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default CollapsibleComponent;
