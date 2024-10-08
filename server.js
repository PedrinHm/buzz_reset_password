const express = require('express');
const path = require('path');
const app = express();

// Serve arquivos estáticos da pasta raiz
app.use(express.static(__dirname));

// Rota para tratar qualquer caminho desconhecido e servir o index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
