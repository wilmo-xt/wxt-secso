
const express = require('express');
const app = express();
const port = 3000;

// Importar o scraper do arquivo wxt-img.js
const { pinterest } = require('./rotas/wxt-img');

// Rota estática para servir o site
app.use(express.static('.'));

// Rota da API para pegar imagens do Pinterest
app.get('/api/pinterest', async (req, res) => {
const query = req.query.q; // Pega o parâmetro 'q' da query string, exemplo: /api/pinterest?q=nature
if (!query) {
return res.status(400).json({ error: "A consulta 'q' é necessária." })
}
try {
const images = await pinterest(query);
res.json({ images })
} catch (error) {
res.status(500).json({ error: "pinterest foi de valas" });
}
})

// Iniciar o servidor
app.listen(port, () => {
console.log(`Servidor rodando na porta http://localhost:${port}`);
});
