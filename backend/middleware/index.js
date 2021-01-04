const { base64encode, base64decode } = require('nodejs-base64');
const utils = require('../utils')
const db = require('../db')
const authenticate = (req, res, next) => {

}

const parseAuthHeader = (req, res, next) => {
    if (!req.get('Authorization')) {
        return res.status(401).json({message: 'Auth not provided'});
    }
    let authArr = req.get('Authorization').split(' ');
    let result = authArr[authArr.length - 1];
    next(result)
}

function decodeBasicHeader(req, res, next) {
    parseAuthHeader(req, res, function (token) {
        let buff = base64decode(token);
        if (utils.checkNull(buff)) {
            return res.status(400).json({ message: 'invalid basic auth' })
        }
        let userObject = buff.split(':')
        if (userObject.length < 2) {
            return res.status(400).json({ message: 'invalid basic auth'})
        }
        next({ username: userObject[0], password: userObject[1] })
    });
}

function authCheck(req, res, next) {
    decodeBasicHeader(req, res, function (userObject) {
        checkUsers(res, userObject.username, userObject.password, (queryResult) => next(queryResult))
    });
}

function checkUsers(res, user, pw, next) {
    db.query('SELECT * FROM users WHERE email = $1 and password = $2', [user, pw], (err, result) => {
        if (err) {
          return res.status(400).json({ message: 'invalid basic auth' })
        } else {
          console.log(result.rows[0])
          next(result.rows[0])
        }
    })
}

module.exports = {
    authCheck
}