const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_SECRET,
    database: 'GameStats',
});

function amendRequest(request) {
    let amendedRequest = {user: 1, kills: 0, damage: 0, win: 0, place: 0, date: '', time: ''};

    if (request.place === '1') {
        amendedRequest['win'] = 1;
    }

    return Object.assign({}, amendedRequest, request);
}

function updateStats(reqObj) {
    let reqArray = Object.values(reqObj);
    console.log(reqObj, reqArray);

    connection.query('INSERT INTO ApexStats(user, kills, damage, win, place, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)',
    reqArray,
    (err) => {
        if (err) throw err;
        console.log('Updated stats table with values in request');
        reqArray.forEach(value => console.log(value));
    });
}

function getRecord(reqObj, res) {
    let id = Object.values(reqObj);
    console.log(id, 'here is the ID', 'here is object.valiues', reqObj);

    connection.query('SELECT * FROM ApexStats WHERE ID = ?', id, (err, response) => {
        if (err) throw err;
        console.log('Found record with id of ' + id);
        if (response.length === 1) {
            res.send(JSON.stringify(response));
        } else {
            res.send(JSON.stringify({'status': 'failed', 'errorMessage': 'More than one record returned'}));
        }
    })
}

function modifyRecord(reqObj, res) {
    let win = parseInt(reqObj.place) === 1 ? 1 : 0;
    let updateValues = [reqObj.kills, reqObj.damage, win, reqObj.place, reqObj.time, reqObj.id];

    if (typeof parseInt(reqObj.id) !== 'number') {
        res.send(JSON.stringify({'status': 'failed', 'errorMessage': 'The ID for the request was not a number'}))
        return;
    }

    connection.query('UPDATE ApexStats SET kills = ?, damage = ?, win = ?, place = ?, time = ? WHERE ID = ?',
    updateValues,
    (err) => {
        if (err) throw err;
        res.send({'status' : 'success', 'successMessage': 'Your values have been updated'});
    });
}

exports.update = (req, res) => {
    console.log(`This is the body of the request: ${req.body}`);

    let requestObject = amendRequest(req.body);
    console.log(`This is the value of the amended request: ${amendRequest(req.body)}`);

    console.log('Updating stats....')
    updateStats(requestObject);

    res.send({success: 'Succesfully updated stats'});
}

exports.edit = (req, res) => {
    console.log(`This is the body of the request: ${req.body}, ${req.body.id}`);

    modifyRecord(req.body, res);
}
