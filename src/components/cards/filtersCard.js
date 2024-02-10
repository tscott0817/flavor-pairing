import {useThemeContext} from '../../stateManager/ThemeContext';
import * as lightColors from "../../stateManager/lightMode";
import * as darkColors from "../../stateManager/darkMode";

const FiltersCard = ({selectedFilters, handleFilterSelect}) => {
    // TODO: Just get this from data instead of hardcoding
    const categories = [
        "additive", "bakery", "berry", "beverage", "beverage alcoholic", "beverage caffeinated",
        "cabbage", "cereal", "dairy", "dish", "essential oil", "fish", "flower", "fruit",
        "fruit citrus", "fruit essence", "fruit berry", "fungus", "gourd", "herb", "legume",
        "maize", "meat", "nut", "plant", "plant derivative", "seafood", "seed", "spice",
        "vegetable", "vegetable fruit", "vegetable root", "vegetable stem", "vegetable tuber"
    ];

    const column1 = categories.slice(0, Math.ceil(categories.length / 2));
    const column2 = categories.slice(Math.ceil(categories.length / 2));
    const {theme} = useThemeContext();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '97.5%',
                overflow: 'auto',
                position: 'relative',
                zIndex: 1,
                // padding: '5%',
                paddingLeft: '5%',
                paddingRight: '5%',
                paddingBottom: '5%',
                marginTop: '5px',
                fontFamily: 'Roboto, sans-serif',
                border: theme === lightColors ? '2px solid #ccc' : 'none',
                borderRadius: '10px',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                backgroundColor: theme === lightColors ? lightColors.navBarColor : darkColors.navBarColor,
            }}
        >
            <div style={{
                marginBottom: '10px',
                padding: '5%',
                fontSize: '20px',
                fontWeight: 'bold',
                position: 'sticky',
                top: '0',
                backgroundColor: theme === lightColors ? lightColors.componentColor : darkColors.componentColor,
                borderBottom: '2px solid #ccc',
                zIndex: 2,
                color: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
            }}>
                Categories
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
            }}>
                <ul style={{
                    textAlign: 'left',
                    listStyleType: 'none',
                    padding: 0,
                    fontSize: '15px',
                    marginRight: '10px',
                }}>
                    {column1.map((category) => (
                        <li key={category} style={{marginBottom: '10px'}}>
                            <label style={{display: 'flex', alignItems: 'center'}}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(category)}
                                    onChange={() => handleFilterSelect(category)}
                                    style={{marginRight: '5px', cursor: 'pointer'}}
                                />
                                {category.replace(/\b\w/g, (char) => char.toUpperCase())}
                            </label>
                        </li>
                    ))}
                </ul>
                <ul style={{textAlign: 'left', listStyleType: 'none', padding: 0, fontSize: '15px'}}>
                    {column2.map((category) => (
                        <li key={category} style={{marginBottom: '10px'}}>
                            <label style={{display: 'flex', alignItems: 'center'}}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.includes(category)}
                                    onChange={() => handleFilterSelect(category)}
                                    style={{marginRight: '5px', cursor: 'pointer'}}
                                />
                                {category.replace(/\b\w/g, (char) => char.toUpperCase())}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FiltersCard;
