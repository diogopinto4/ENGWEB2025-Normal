const express = require('express');
const mongoose = require('mongoose');
const edicoesRouter = require('./routes/edicoes');
const paisesRouter = require('./routes/paises');
const interpretesRouter = require('./routes/interpretes');

const app = express();

app.use(express.json());

// Altera para o host do mongo conforme o ambiente (localhost ou docker-compose)
mongoose.connect('mongodb://localhost:27017/eurovisao', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/edicoes', edicoesRouter);
app.use('/paises', paisesRouter);
app.use('/interpretes', interpretesRouter);

const PORT = 25000;
app.listen(PORT, () => {
    console.log(`API Eurovisão a correr na porta ${PORT}`);
});
