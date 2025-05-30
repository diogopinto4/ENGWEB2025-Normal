const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

const API = 'http://localhost:25000'; // Muda para o endereço da tua API se for em Docker

// Homepage: lista edições
app.get('/', async (req, res) => {
    try {
        const { data: edicoes } = await axios.get(`${API}/edicoes`);
        res.render('index', { edicoes });
    } catch (e) {
        res.status(500).render('error', { error: e.message });
    }
});

// Detalhe de uma edição
app.get('/edicao/:id', async (req, res) => {
    try {
        const { data: edicao } = await axios.get(`${API}/edicoes/${req.params.id}`);
        res.render('edicao', { edicao });
    } catch (e) {
        res.status(404).render('error', { error: 'Edição não encontrada.' });
    }
});

// Permite aceder à edição também por /:id
app.get('/:id', async (req, res) => {
    try {
        const { data: edicao } = await axios.get(`${API}/edicoes/${req.params.id}`);
        res.render('edicao', { edicao });
    } catch (e) {
        res.status(404).render('error', { error: 'Edição não encontrada.' });
    }
});

// Página de país (organizador ou vencedor)
app.get('/paises/:pais', async (req, res) => {
    const pais = req.params.pais;

    try {
        // 1. Todas as edições em que este país participou (em músicas)
        const { data: edicoes } = await axios.get(`${API}/edicoes`);
        let participacoes = [];
        let organizou = [];

        for (const ed of edicoes) {
            // Participações
            const musicasPais = ed.musicas
                ? ed.musicas.filter(m => m.país === pais)
                : [];
            for (const m of musicasPais) {
                participacoes.push({
                    id: ed.id,
                    ano: ed.anoEdição,
                    titulo: m.título,
                    interprete: m.intérprete,
                    vencedor: ed.vencedor === pais // Venceu esta edição?
                });
            }
            // Organizou
            if (ed.organizacao === pais) {
                organizou.push({
                    id: ed.id,
                    ano: ed.anoEdição
                });
            }
        }

        res.render('pais', {
            pais,
            participacoes,
            organizou
        });
    } catch (e) {
        res.status(500).render('error', { error: e.message });
    }
});

// Página de intérpretes
app.get('/interpretes', async (req, res) => {
    try {
        const { data: interpretes } = await axios.get(`${API}/interpretes`);
        res.render('interpretes', { interpretes });
    } catch (e) {
        res.status(500).render('error', { error: e.message });
    }
});

const PORT = 25001;
app.listen(PORT, () => console.log(`Web app na porta ${PORT}`));
