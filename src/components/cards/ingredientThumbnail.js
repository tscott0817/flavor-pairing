import {
    defaultPageNeonColor,
    thumbNailColor,
    thumbNailColorText
} from "../../colors";

const IngredientThumbnail = ({ingredient_name, ingredient_id, font_size}) => {
    // const imageURL = `https://cosylab.iiitd.edu.in/flavordb/static/entities_images/${ingredient_id}.jpg`;
    const imageURL = `/images/${ingredient_id}.jpg`;
    const capitalizeWords = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: thumbNailColor,
                display: 'flex',
                flexDirection: 'column', // To stack text and image vertically
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                boxSizing: 'border-box',
                paddingLeft: '3%',
                paddingRight: '3%',
                paddingTop: '3%',
                boxShadow: defaultPageNeonColor,
            }}
        >
            <div
                style={{
                    // backgroundColor: 'blue',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px 8px 0 0',
                }}
            >
                <img
                    src={imageURL}
                    alt={`Ingredient ${ingredient_name}`}
                    loading='lazy'
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                    }}
                />
            </div>
            <div
                style={{
                    padding: '1%',
                    textAlign: 'center',
                    marginTop: '3%',
                    // backgroundColor: randomTempColor,
                    // fontFamily: 'Crimson Text, serif', fontStyle: 'italic', fontWeight: 'bold',
                    fontFamily: 'Lora, serif',
                    fontStyle: 'italic',
                    fontSize: font_size || '1.2em',
                    color: thumbNailColorText,
                }}
            >
                {capitalizeWords(ingredient_name)}
            </div>
        </div>
    );
};

export default IngredientThumbnail;
