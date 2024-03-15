const express = require('express');
const Language = require('../data/models/languageModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const languages = await Language.findAll();
        if (!languages) {
            res.status(500).json({error: 'No se han podido obtener los idiomas de la base de datos'});
        } else {
            console.log(languages[0].imageUrl)
            res.status(200).json(languages);
        }
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({error: 'No se han podido obtener los idiomas de la base de datos'});
    }
});

module.exports = router;