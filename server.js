const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'catalogo.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
