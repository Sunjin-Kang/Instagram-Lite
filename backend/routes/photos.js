var express = require('express');
var router = express.Router();
const auth = require('../middleware');
const db = require('../db')
const bucket = require('../bucket');

/* GET users listing. */

router.get('/', function (req, res) {
  auth.authCheck(req, res, function (queryResult) {
    db.query('SELECT * FROM photos WHERE user_id = $1', [queryResult.id], (err, result) => {
        if (err) {
          return res.status(400).json({ message: 'not found' })
        } else {
          return res.status(200).json(result.rows)
        }
    })
  });
});

router.post('/', (req, res) => {
    auth.authCheck(req, res, async (queryResult) => {
        const imageUrl = await bucket(req.file)
        db.query('INSERT INTO photos(user_id, url) VALUES($1, $2)', [queryResult.id, imageUrl], (err, result) => {
            if (err) {
              return res.status(400).json({ message: 'failed to create', error: err, imageUrl: imageUrl  })
            } else {
              return res.status(200).json({ message: 'image uploaded' })
            }
        })
    });
});

  
module.exports = router;
