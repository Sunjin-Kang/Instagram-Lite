const { base64encode, base64decode } = require('nodejs-base64');
const utils = require('../utils')

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
        if (userObject.username !== 'Peter' && userObject.password !== '12345') {
            return res.status(400).json({ message: 'invalid basic auth' })
        }
        next(userObject)
    });
}

module.exports = {
    authCheck
}