const express = require('express');
const router = express.Router();
const deepl = require('deepl-node');

const authKey = "e23571dd-4633-4082-948a-ab373b2bde68:fx";
const translator = new deepl.Translator(authKey);

router.get('/:originalText/:language', async (req, res) => {
    try {
        const { originalText, language } = req.params;
        const result = await translator.translateText(originalText, null, language);
        const translatedText = result["text"];
        res.json( {message: translatedText} );
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({error: 'No se ha podido traducir correctamente'});
    }
});

module.exports = router;