import IngredientCard from './ingredientCard';
import {pageSectionColor, randomTempColor2, sectionItemColor} from "../../stateManager/lightMode";
import {RxSlash} from 'react-icons/rx';
import {FaPlus} from 'react-icons/fa';
import {useIngredientContext} from "../../stateManager/IngredientContext";
import { useThemeContext } from '../../stateManager/ThemeContext';
import * as lightColors from "../../stateManager/lightMode";
import * as darkColors from "../../stateManager/darkMode";

const IngredientCombinedCard = () => {
    const {selectedIngredients, unselectIngredient} = useIngredientContext();
    const ingredient1 = selectedIngredients[0];
    const ingredient2 = selectedIngredients[1];
    const {theme} = useThemeContext();

    return (
        <div style={{
            display: 'flex',
            // backgroundColor: 'red',
            borderRadius: '8px',
            justifyContent: 'center',
            alignItems: 'center',
            // border: '1px solid #000',
            // boxSizing: 'border-box',
            // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)'
        }}>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                // backgroundColor: 'red',
                width: '25%',
                height: '100%',
                borderRadius: '8px',
                marginTop: '1%',
                marginBottom: '1%',
                fontSize: '1em',
                // border: '1px solid #000',
                // boxSizing: 'border-box',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            }}>
                <IngredientCard ingredient={ingredient1}/>
            </div>
            <div style={{
                fontFamily: 'Arial, sans-serif',
                // backgroundColor: 'green',
                width: '5%',
                height: '100%',
                // marginTop: '3.5%',
                marginLeft: '2%',
                marginRight: '2%',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1em',
                fontWeight: 'bold',
                color: theme === lightColors ? lightColors.textMedHeavy : darkColors.textMedHeavy,
            }}>
                <FaPlus style={{
                    height: '100%',
                    fontSize: '25px'
                }}/>
            </div>
            <div style={{
                fontFamily: 'Roboto, sans-serif',
                // backgroundColor: 'red',
                width: '25%',
                borderRadius: '8px',
                marginTop: '1%',
                marginBottom: '1%',
                // overflow: 'auto',
                fontSize: '1em',
                // border: '1px solid #000',
                // boxSizing: 'border-box',
                // boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            }}>
                <IngredientCard ingredient={ingredient2}/>
            </div>
        </div>
    );
};


export default IngredientCombinedCard;