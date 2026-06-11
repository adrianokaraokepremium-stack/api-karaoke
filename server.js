const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir o seu catálogo (se ele estiver na mesma pasta ou numa pasta chamada 'public')
app.use(express.static(path.join(__dirname)));

const linkBancoDeDados = 'mongodb://adrianokaraokepremium_db_user:YROvZgzFXcWRlSNm@ac-sqazej0-shard-00-00.ljxz4kh.mongodb.net:27017,ac-sqazej0-shard-00-01.ljxz4kh.mongodb.net:27017,ac-sqazej0-shard-00-02.ljxz4kh.mongodb.net:27017/karaoke?ssl=true&replicaSet=atlas-g8iunb-shard-0&authSource=admin&appName=Cluster0';

mongoose.connect(linkBancoDeDados)
  .then(() => console.log('Conectado ao banco de dados com sucesso!'))
  .catch(erro => console.log('Erro ao conectar:', erro));

const MusicaSchema = new mongoose.Schema({
    musica: String,
    cantor: String,
    codigo: String
}, { collection: 'musicas' }); 

const Musica = mongoose.model('Musica', MusicaSchema);

// Rota de busca de músicas
app.get('/musicas', async (req, res) => {
    try {
        const lista = await Musica.find();
        res.json(lista);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar músicas' });
    }
});

// Rota principal para abrir o seu catálogo
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'catalogo.html'));
});

// Porta dinâmica para funcionar no Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});
