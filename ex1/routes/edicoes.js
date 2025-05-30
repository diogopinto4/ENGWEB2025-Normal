const express = require('express');
const router = express.Router();
const Edicao = require('../models/Edicao');

// GET /edicoes?org=pais
router.get('/', async (req, res) => {
    try {
        if (req.query.org) {
            const eds = await Edicao.find({ organizacao: req.query.org }, 'id anoEdição organizacao vencedor')
            res.json(eds);
        } else {
            const eds = await Edicao.find({}, 'id anoEdição organizacao vencedor musicas')
            res.json(eds);
        }
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// GET /edicoes/:id
router.get('/:id', async (req, res) => {
    try {
        const ed = await Edicao.findOne({ id: req.params.id });
        if (ed) res.json(ed);
        else res.status(404).json({ erro: 'Edição não encontrada' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// POST /edicoes
router.post('/', async (req, res) => {
    try {
        const nova = new Edicao(req.body);
        await nova.save();
        res.status(201).json(nova);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

// DELETE /edicoes/:id
router.delete('/:id', async (req, res) => {
    try {
        const result = await Edicao.deleteOne({ id: req.params.id });
        if (result.deletedCount === 1)
            res.json({ mensagem: 'Edição removida com sucesso' });
        else
            res.status(404).json({ erro: 'Edição não encontrada' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// PUT /edicoes/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await Edicao.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (updated)
            res.json(updated);
        else
            res.status(404).json({ erro: 'Edição não encontrada' });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

module.exports = router;
