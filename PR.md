# PR.md

## Engenharia Web 2024/25 — Projeto Eurovision

### **Persistência de Dados**

Os dados da Eurovisão foram fornecidos num ficheiro JSON, que foi analisado, as secções de países foram normalizadas para terem igual representação (ex: United_Kingdom e United Kingdom) e convertido para um array de objetos para facilitar a importação em MongoDB.  
A base de dados utilizada foi o **MongoDB**, e a coleção criada chama-se `edicoes`.

A importação dos dados foi feita com:
``` bash
mongoimport -d eurovisao -c edicoes dataset_array.json --jsonArray
```

### Setup da Base de Dados

SGBD: MongoDB (localhost:27017)

Base de dados: eurovisao

Coleção: edicoes

A estrutura de cada documento inclui:

id, anoEdição, organizacao, vencedor, musicas (array de { título, país, intérprete })

### Execução das Aplicações

API de Dados (Exercício 1)
Acede à pasta da API (por exemplo, ex1/).

Instalar as dependências:

```bash
npm install
```
Garante que o MongoDB está a correr.

Arrancar o servidor:

``` bash
npm start
```

O servidor ficará disponível em http://localhost:25000.

Interface Web (Exercício 2)
Acede à pasta da interface web (por exemplo, ex2/).

Instala as dependências:

```bash
npm install
```

``` bash
npm start
```

O servidor ficará disponível em http://localhost:25001.