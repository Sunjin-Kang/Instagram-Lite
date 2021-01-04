var express = require('express');
var router = express.Router();
const auth = require('../middleware')

/* GET users listing. */

router.get('/', function (req, res) {
  auth.authCheck(req, res, function (queryResult) {
    return res.status(200).json({ message: queryResult })
  });
});
module.exports = router;
