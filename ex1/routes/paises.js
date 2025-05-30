const express = require('express');
const router = express.Router();
const Edicao = require('../models/Edicao');

// /paises?papel=org
// /paises?papel=venc
router.get('/', async (req, res) => {
    try {
        if (req.query.papel === 'org') {
            const result = await Edicao.aggregate([
                {
                    $group: {
                        _id: "$organizacao",
                        anos: { $push: "$anoEdição" }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
            res.json(result.map(p => ({
                pais: p._id,
                anos: p.anos
            })));
        }
        else if (req.query.papel === 'venc') {
            const result = await Edicao.aggregate([
                { $match: { vencedor: { $exists: true } } },
                {
                    $group: {
                        _id: "$vencedor",
                        anos: { $push: "$anoEdição" }
                    }
                },
                { $sort: { _id: 1 } }
            ]);
            res.json(result.map(p => ({
                pais: p._id,
                anos: p.anos
            })));
        }
        else {
            res.status(400).json({ erro: "papel inválido" });
        }
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
});

module.exports = router;
