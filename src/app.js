const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const userController = require('./userController');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', userController.register);
app.post('/login', userController.login);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
