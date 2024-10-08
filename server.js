const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve os arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Para todas as outras rotas, redireciona para a página inicial (útil para Single Page Applications)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
