"use strict";
var express = require('express');
var router = express.Router();
var connection = require('../models/mysql.js');



/* API Division */
router.get('/:table', (req, res, next) => {
    consultarAll(req.params.table, req.query, (salida) => {
        res.json(salida);
    });
});

router.get('/:table/:id', function(req, res, next) {
    console.log(req.params);
    consultarById(req.params.table, req.params.id, (salida) => {
        res.json(salida);
    });
});

router.post('/:table', function(req, res, next) {
  res.json({object1: "division"});
});

router.put('/:table/:id', function(req, res, next) {
  res.json({object1: "division"});
});

router.delete('/:table/:id', function(req, res, next) {
  res.json({object1: "division"});
});

// Funcion para factorizar
function consultarAll(params, query, callback) {
    if ( isFull(query) ) {
        connection.query('SELECT * FROM ?? WHERE ?', [params, query], (err, rows, fields) => {
            if (err) throw err;
            callback(rows);
        });
    } else {
        connection.query('SELECT * FROM ??', [params], (err, rows, fields) => {
            if (err) throw err;
            callback(rows);
        });
    }
}

function consultarById(params, params2, callback) {
    connection.query('SELECT * FROM ?? WHERE id = ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
});}

function addNew(params, params2, callback) {
    connection.query('SELECT * FROM ?? WHERE id = ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
});}

function updateById(params, params2, callback) {
    connection.query('SELECT * FROM ?? WHERE id = ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
});}

function deleteById(params, params2, callback) {
    connection.query('SELECT * FROM ?? WHERE id = ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
});}

function isFull(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return true;
    }
    return false;
}

module.exports = router;