const express = require('express');
const router = express.Router();
const Edicao = require('../models/Edicao');

router.get('/', async (req, res) => {
    try {
        // Unwind e agrupa para garantir sem repetições
        const result = await Edicao.aggregate([
            { $unwind: "$musicas" },
            { $group: {
                _id: { nome: "$musicas.intérprete", pais: "$musicas.país" }
            }},
            { $sort: { "_id.nome": 1 } }
        ]);
        res.json(result.map(i => ({
            nome: i._id.nome,
            pais: i._id.pais
        })));
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
});

module.exports = router;
