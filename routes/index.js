"use strict";
var express = require('express');
var router = express.Router();
var connection = require('../models/mysql.js');

var hola = {
    "nombre": "Staff Boxx",
    "padre": null,
    "pagina": 0,
    "funciones": "",
    "user":{
            "nombre": "Sergio García",
            "user": "sgarcia",
            "foto": "sergio-garcia.jpg",
            "id": 27,
            "createdAt": "2015-10-16T08:48:14.000Z",
            "updatedAt": "2015-10-21T11:00:04.000Z"
            },
    "id": 65,
    "createdAt": "2015-10-16T08:45:23.000Z",
    "updatedAt": "2015-10-20T15:32:02.000Z"
  };

/* API Division */


router.get('/pruebas', (req, res, next) => {
    connection.query('SELECT * FROM division LIMIT 4', (err, rows, fields) => {
        if (err) throw err;
        rows.map( (i)=> {
            if (i.user) {
                connection.query('SELECT * FROM usuario WHERE id = ?', [i.user], (err, rows, fields) => {
                    if (err) throw err;
                    console.log(rows);
                    i.user = rows[0];
                });
            }
        });
        setTimeout(function() {
            res.json(rows);
        }, 2000);
    });
});

router.get('/:table', (req, res, next) => {
    consultarAll(req.params.table, req.query, (salida) => {
        res.status(200).json(salida);
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


//Promise para las sub-llamadas
function selectDb (params, query) {
    let promise = new Promise((resolve, reject) => {
        connection.query('SELECT * FROM ?? WHERE ?', [params, query], (err, rows, fields) => {
            if (err) {console.log(err); reject(err);}
            resolve(rows);
        });
    });
    return promise;
}

// Funcion para factorizar
function consultarAll(params, query, callback) {
    console.log('funcion consultarAll');
    if ( isFull(query) ) {
        console.log('primer condicional');
        selectDb(params, query)
            //Primer Then
            .then((rest) => {
                console.log('ejecuta primer then');
                rest.map((i) => {
                    if(i.pagina === 1) {i.pagina = true;} 
                    else if(i.pagina === 0) {i.pagina = false;}
                    i.usuarios = null;
                });
                return rest;
            })
            //Segundo Then
            .then((rest) =>  {
                console.log('ejecuta segundo then');
                let count = 0;
                
                rest.map((i) => {

                    selectDb('usuario', {id:i.user})
                    .then((restSub) => {
                        count ++;
                        i.user = restSub[0];
                        if (count/2 == rest.length) callback(rest);
                    }).catch(() => {/*return undefined;*/});

                    selectDb('usuario', {id:i.user})
                    .then ((restSub) => {
                        count ++;
                        i.usuarios = restSub[0];
                        if (count/2 == rest.length) callback(rest);
                    }).catch(() => {/*return undefined;*/});
                });
                
            })
            .catch((err) => {
                console.log('tira error');
                callback(err);
            });
        /*
        connection.query('SELECT * FROM ?? WHERE ?', [params, query], (err, rows, fields) => {
            if (err) throw err;
            let length = rows.length;
            let counter = 0;
            let that = rows;
            rows.map((i)=> {
                if(i.pagina === 1) {i.pagina = true;} 
                else if(i.pagina === 0) {i.pagina = false;}
                i.usuarios = null;
                connection.query('SELECT * FROM usuario WHERE id = ?', [i.user], (err, rows, fields) => {
                    if (err) throw err;
                    i.user = rows[0];
                    counter ++;
                    if (counter === length) {
                        callback(that);
                    }
                });
            });
        });
        */
    } else {
        connection.query('SELECT * FROM ??', [params], (err, rows, fields) => {
            if (err) throw err;
            let length = rows.length;
            let counter = 0;
            let that = rows;
            rows.map((i)=> {
                connection.query('SELECT * FROM usuario WHERE id = ?', [i.user], (err, rows, fields) => {
                    if (err) throw err;
                    i.user = rows[0];
                    counter ++;
                    if (counter === length) {
                        callback(that);
                    }
                });
            });
        });
    }
}

function consultarById(params, params2, callback) {
    connection.query('SELECT * FROM ?? WHERE id = ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        let length = rows.length;
        let counter = 0;
        let that = rows;
        rows.map((i)=> {
            connection.query('SELECT * FROM usuario WHERE id = ?', [i.user], (err, rows, fields) => {
                if (err) throw err;
                i.user = rows[0];
                counter ++;
                if (counter === length) {
                    callback(that);
                }
            });
        });
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