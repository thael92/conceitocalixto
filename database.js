const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./appointments.db');

// Cria a tabela de agendamentos
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            service TEXT,
            date TEXT,
            time TEXT,
            message TEXT
        )
    `);
});

module.exports = db;
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            service TEXT,
            date TEXT,
            time TEXT,
            message TEXT
        )
    `);
});
