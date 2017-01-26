"use strict";
var express = require('express');
var router = express.Router();
var db = require('../models/models.js');


/* API Division */
router.get('/division', (req, res, next) => {
    db.consultarAllDivision('division', req.query, (salida) => {
        console.log(req.query);
        console.warn(salida.length + ' resultados');
        if (salida.length <= 1) {
            res.status(200).json(salida[0]);  
        } else {
            res.status(200).json(salida);
        }
    });
});

router.get('/division/:id', function(req, res, next) {
    db.consultarAllDivision('division', req.params, (salida) => {
        console.log(req.params);
        console.warn(salida.length + ' resultados');
        if (salida.length <= 1) {
            res.status(200).json(salida[0]);  
        } else {
            res.status(200).json(salida);
        }
    });
});

router.post('/division', function(req, res, next) {
    db.addNewDivision('division', req.body, salida => {
        res.json(salida);
    });
  
});

router.put('/division/:id', function(req, res, next) {
    let idParam = req.params.id;
    let bolean;
if (req.body.pagina === 'true') { bolean = 1; } else { bolean = 0; }
    let dvParam = {
        nombre: req.body.nombre,
        padre: req.body.padre,
        user: req.body.user,
        pagina: bolean,
        funciones: req.body.funciones
    };
    console.log(req.body.pagina);
    console.log(bolean);
    let usParam = req.body.usuarios;
    db.updateDivision('division', dvParam, usParam, idParam, salida => {
        res.json(salida);
    });
});

router.delete('/division/:id', function(req, res, next) {
    db.deleteDivisionUsers(req.params.id, salida => {
        res.json(salida);
    });
});

/* API Usuarios */
router.get('/usuario', (req, res, next) => {
    db.consultarAllUser('usuario', req.query, (salida) => {
        console.log(req.query);
        console.log(salida.length + ' resultados');
        if (salida.length <= 1) {
            res.status(200).json(salida[0]);  
        } else {
            res.status(200).json(salida);
        }
    });
});

router.get('/usuario/:id', (req, res, next) => {
    console.log(req.params);
    db.consultarAllUser('usuario', req.params, (salida) => {
        console.log(req.query);
        console.log(salida.length + ' resultados');
        if (salida.length <= 1) {
            res.status(200).json(salida[0]);  
        } else {
            res.status(200).json(salida);
        }
    });
    
});

router.post('/usuario', function(req, res, next) {
    console.log(req.body);
    db.addNewUser('usuario', req.body, (salida) => {
        res.json(salida);
    });
});

router.put('/usuario/:id', function(req, res, next) {
    console.log(req.params);
    console.log(req.body);
    db.updateByIdUser('usuario', req.body, req.params.id, (salida) => {
        res.json(salida);
    });
});



/* API Comunes */
router.delete('/:table', function(req, res, next) {
    console.log(req.params);
    console.log(req.query);
    db.deleteById(req.params.table, req.query, (salida) => {
        res.json(salida);
    });
});


module.exports = router;
