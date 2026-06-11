const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Olha o seu link aqui, já prontinho e com as modificações feitas!
const linkBancoDeDados = 'mongodb://adrianokaraokepremium_db_user:YROvZgzFXcWRlSNm@ac-sqazej0-shard-00-00.ljxz4kh.mongodb.net:27017,ac-sqazej0-shard-00-01.ljxz4kh.mongodb.net:27017,ac-sqazej0-shard-00-02.ljxz4kh.mongodb.net:27017/karaoke?ssl=true&replicaSet=atlas-g8iunb-shard-0&authSource=admin&appName=Cluster0';

mongoose.connect(linkBancoDeDados)
  .then(() => console.log('Conectado ao banco de dados com sucesso!'))
  .catch(erro => console.log('Erro ao conectar:', erro));

// Estrutura apontando para a coleção "musicas"
const MusicaSchema = new mongoose.Schema({
    musica: String,
    cantor: String,
    codigo: String
}, { collection: 'musicas' }); 

const Musica = mongoose.model('Musica', MusicaSchema);

// Rota que o seu catálogo HTML vai chamar
app.get('/musicas', async (req, res) => {
    try {
        const lista = await Musica.find();
        res.json(lista);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar músicas' });
    }
});

app.listen(3000, () => {
    console.log('Ponte ligada! Servidor rodando na porta 3000');
});