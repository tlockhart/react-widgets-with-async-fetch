import React, {useState, useEffect} from 'react';
import axios from 'axios';

// make a new request if language or text changes in anyway
const Convert = ({language, text}) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);
        return () => {
            clearTimeout(timeId);
        };
    }, [text]);

    useEffect(() => {

        const doTranslation = async () => {
            // send url, body, query params
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params: {
                    q: debouncedText, target: language.value, key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                }
            });
            // set the response to the translated state variable
            setTranslated(data.data.translations[0].translatedText);
        };

        doTranslation();
        // Only check for changes in inputs, not what was received or calculated.
    }, [language, debouncedText]);

    return <div>
        <div>
            <h1 className={"ui header"}>{translated}</h1>
        </div>
    </div>;
}

export default Convert;