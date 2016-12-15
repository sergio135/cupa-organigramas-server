var express = require('express');
var router = express.Router();

/* API Division */
router.get('/:table', function(req, res, next) {
    
    console.log(req.params);
    connection.connect();
 
    connection.query('SELECT * FROM usuario', function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    });
 
    connection.end();

    res.json({object1: "division"});
});

router.get('/:table/:id', function(req, res, next) {
    console.log(req.params);
    //console.log(req.path);
    res.json({object1: "division"});
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




module.exports = router;