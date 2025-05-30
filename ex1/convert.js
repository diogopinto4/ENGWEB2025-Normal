const fs = require('fs');

const raw = require('./dataset.json'); // ficheiro original
const arr = Object.values(raw); // converte objeto em array

fs.writeFileSync('dataset_array.json', JSON.stringify(arr, null, 2));
console.log('Ficheiro convertido: dataset_array.json');
