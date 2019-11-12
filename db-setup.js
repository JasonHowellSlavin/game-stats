const mysql = require('mysql');
const stats = require('./apex-stats');

const rootConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'example',
});

rootConnection.connect();

rootConnection.query('CREATE DATABASE GameStats', (error, results, fields) => {
    if (error) throw error;
    console.log('DB "Users" created');
});

rootConnection.changeUser({database: 'GameStats'}, (error) => {
    if (error) throw error;
})

rootConnection.query('CREATE TABLE Users (user_id int PRIMARY KEY NOT NULL AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255), recoveryHash VARCHAR(255))',
 (error, results, fields) => {
    if (error) throw error;
    console.log('Table Users created');
});

rootConnection.query('CREATE TABLE ApexStats (ID int AUT_INCRMENET PRIMARY KEY, user int, kills int, damage int, win boolean, place int, date DATE, time TIME, FOREIGN KEY(user) REFERENCES Users(user_id) ON DELETE CASCADE)',
 (error, results, fields) => {
    if (error) throw error;
    console.log('Table ApexStats created');
});

rootConnection.query('INSERT INTO Users(email, password, recoveryHash) VALUES ("slavin.jhs@gmail.com", "raspberry", null)', (err) => {
    if (err) throw err;
    console.log('updated users table');
});

stats.forEach((stat) => {
    console.log(stat);
    rootConnection.query('INSERT INTO ApexStats(user, kills, damage, win, place, date, time) VALUES (?, ?, ?, ?, ?, ?, CURTIME())',
    stat,
    (err) => {
        if (err) throw err;
        console.log('updated stats table');
    });
});

rootConnection.end();
