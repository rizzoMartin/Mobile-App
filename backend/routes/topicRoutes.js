const express = require('express');
const Topic = require('../data/models/topicModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const topics = await Topic.findAll();
        if(!topics){
            res.status(500).json({error: 'No se han podido obtener los temas de la base de datos'});
        } else {
            res.status(200).json(topics);
        }
    } catch (error) {
      console.error('Error al recuperar los niveles:', error);
      res.status(500).send('Ocurrió un error al procesar tu solicitud');
    }
});

module.exports = router;