const express = require('express');
const Level = require('../data/models/levelModel');
const router = express.Router();

router.get('/:topicId/:languageId', async (req, res) => {
    try {
        const { topicId, languageId } = req.params;
        const levels = await Level.findAll({
            where: {
                topic_id: topicId,
                language_id: languageId
            }
        });
        if(!levels){
            res.status(500).json({error: 'No se han podido obtener los datos del nivel de la base de datos'});
        } else {
            res.status(200).json(levels);
        }
    } catch (error) {
      console.error('Error al recuperar los niveles:', error);
      res.status(500).send('Ocurrió un error al procesar tu solicitud');
    }
});

module.exports = router;