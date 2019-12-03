const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_SECRET,
    database: 'GameStats',
});

exports.stats = (req, res) => {
    connection.query('SELECT * FROM ApexStats ORDER BY ID DESC', (error, results, fields) => {
        if (error) throw error;
        res.send((JSON.stringify(results)));
    })
};

exports.dailyStats = (req, res) => {
    connection.query('SELECT * FROM ApexStats WHERE date = ?', req.body.date, (err, response) => {
        if (err) throw err;(
        res.send(JSON.stringify(response)));
    })
}

exports.update = (req, res) => {
    console.log('req');
    res.send("no");
}
