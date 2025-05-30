const mongoose = require('mongoose');

const MusicaSchema = new mongoose.Schema({
    id: String,
    título: String,
    país: String,
    compositor: String,
    intérprete: String,
    letra: String,
    link: String
}, { _id: false });

const EdicaoSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    anoEdição: String,
    musicas: [MusicaSchema],
    organizacao: String,
    vencedor: String
});

module.exports = mongoose.model('Edicao', EdicaoSchema, 'edicoes');
