"use strict";
var connection = require('./mysql.js');


// Funcion para factorizar
exports.consultarAllDivision = (params, query, callback) => {
    //console.log('funcion consultarAll');
    selectDb(params, query)
    .then(rest => {
        //console.log('ejecuta primer then');
        rest.map((i) => {
            if(i.pagina === 1) {i.pagina = true;} 
            else if(i.pagina === 0) {i.pagina = false;}
            i.usuarios = [];
        });
        return rest;
    })
    .then(rest =>  {
        //console.log('ejecuta segundo then');
        let count = 0;
        rest.map((i) => {
            //console.log('ejecuta array');
            let promi1 = selectDb('usuario', {id:i.user});
            let promi2 = selectDbJoin('division_usuarios__usuario_usuarios_usuario', 'usuario', {division_usuarios:i.id});
            Promise.all([promi1, promi2])
            .then(values => { 
                //console.log('ejecuta array then');
                i.user = values[0][0];
                i.usuarios = values[1];
                count ++;
                if (count == rest.length) callback(rest);
            })
            .catch(err => {
                //console.log('tira error');
                callback(err);
            });
        });
    })
    .catch(err => {
        console.log('tira error');
        callback(err);
    });
};

exports.addNewDivision = (params, params2, callback) => {
    connection.query('INSERT INTO ?? SET ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
};

exports.updateDivision = (params, params2, params3, params4, callback) => {
    connection.query('UPDATE ?? SET ? WHERE id = ?', [params, params2, params4], (err, rows, fields) => {
        if (err) throw err;
        console.log(params3);
        let count = 0;
        params3.map(rest => {
            connection.query('INSERT INTO division_usuarios__usuario_usuarios_usuario SET ?', {division_usuarios: params4 ,usuario_usuarios_usuario: rest}, (err, rows, fields) => {
                if (err) throw err;    
            });
        });
        callback(rows);
    });
};

exports.deleteDivisionUsers = (params, callback) => {
    connection.query('DELETE FROM division_usuarios__usuario_usuarios_usuario WHERE division_usuarios = ?', params, (err, rows, fields) => {
        if (err) throw err; 
        callback(rows);   
    });
};

// Factorizado para API Usuarios
exports.consultarAllUser = (params, query, callback) => {
    console.log('funcion consultarAllUser');
    selectDb(params, query)
    .then(rest => {
        callback(rest);
    })
    .catch(err => {
        callback(err);
    });
};

exports.addNewUser = (params, params2, callback) => {
    connection.query('INSERT INTO ?? SET ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
    
};

exports.updateByIdUser = (params, params2, params3, callback) => {
    connection.query('UPDATE ?? SET ? WHERE id = ?', [params, params2, params3], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
    
};



// Factorizado para API general
exports.deleteById = (params, params2, callback) => {
    connection.query('DELETE FROM ?? WHERE ?', [params, params2], (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
    console.log(test.sql);
};



// Funcion para comporbar si el obj esta vacio o lleno.
function isFull(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return true;
    }
    return false;
}

//Promises para las llamadas DB
function selectDb (params, queryParam) {
    let promise = new Promise((resolve, reject) => {
        if (isFull(queryParam)) {
            //console.log('ejecuta con params');
            connection.query('SELECT * FROM ?? WHERE ?', [params, queryParam], (err, rows, fields) => {
                if (err) {console.log(err); reject(err);}
                resolve(rows);
            });
        } else {
            //console.log('sin params');
            connection.query('SELECT * FROM ??', [params], (err, rows, fields) => {
                if (err) {console.log(err); reject(err);}
                resolve(rows);
            });
        }
    });
    return promise;
}

function selectDbJoin (params, joins, queryParam) {
    let promise = new Promise((resolve, reject) => {
        if (isFull(queryParam)) {
            //console.log('ejecuta con params');
            connection.query('SELECT * FROM ?? d JOIN ?? f ON (d.usuario_usuarios_usuario=f.id) WHERE ?', [params, joins, queryParam], (err, rows, fields) => {
                if (err) {console.log(err); reject(err);}
                resolve(rows);
            });
        } else {
            //console.log('sin params');
            connection.query('SELECT * FROM ?? d JOIN ?? f ON (d.usuario_usuarios_usuario=f.id)', [params, joins], (err, rows, fields) => {
                if (err) {console.log(err); reject(err);}
                resolve(rows);
            });
        }
    });
    return promise;
}