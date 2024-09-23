const db = require('./db');

exports.register = (req, res) => {
    const { first_name, last_name, email, birth_date, password } = req.body;

    db.run(`INSERT INTO users (first_name, last_name, email, birth_date, password) VALUES (?, ?, ?, ?, ?)`, 
    [first_name, last_name, email, birth_date, password], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "Usuário registrado com sucesso!" });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (row) {
            res.json({ message: "Login realizado com sucesso!" });
        } else {
            res.status(401).json({ message: "Credenciais inválidas!" });
        }
    });
};
