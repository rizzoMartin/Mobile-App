const express = require('express');
const Level = require('../data/models/levelModel');
const router = express.Router();

router.get('/levels', async (req, res) => {
    const { topicId, languageId } = req.query;
    try {
        const levels = await Level.findAll({
            where: {
                topic_id: topicId,
                language_id: languageId
            }
        });
        if (levels && levels.length > 0) {
            res.status(200).json(levels);
        } else {
            res.status(404).json({ error: 'No se han podido obtener los datos del nivel de la base de datos' });
        }
    } catch (error) {
        console.error('Error al recuperar los niveles:', error);
        res.status(500).send('Ocurrió un error al procesar tu solicitud');
    }
});

// Para verificar la respuesta de un nivel específico
router.get('/verify-answer', async (req, res) => {
    const { levelId, userAnswer } = req.query;
    try {
        const level = await Level.findOne({
            where: {
                id: levelId
            }
        });
        if (level) {
            if (userAnswer.toLowerCase() === level.solution.toLowerCase()) {
                res.status(200).json({ solution: level.solution });
            } else {
                res.status(200).json({ solution: 'respuesta incorrecta' });
            }
        } else {
            res.status(404).json({ error: 'Nivel no encontrado' });
        }
    } catch (error) {
        console.error('Error al comprobar la respuesta correcta', error);
        res.status(500).json({ error: 'Ocurrió un error al comprobar la solución con la base de datos' });
    }
});

module.exports = router;