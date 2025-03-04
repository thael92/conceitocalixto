const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/appointments', (req, res) => {
    db.all('SELECT time FROM appointments', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        const bookedTimes = rows.map(row => row.time);
        res.json(bookedTimes);
    });
});

app.post('/api/appointments', (req, res) => {
    const { name, phone, service, date, time, message } = req.body;

    db.run(
        'INSERT INTO appointments (name, phone, service, date, time, message) VALUES (?, ?, ?, ?, ?, ?)',
        [name, phone, service, date, time, message],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID });
        }
    );
});

app.get('/', (req, res) => {
    res.send('Servidor rodando com sucesso!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
