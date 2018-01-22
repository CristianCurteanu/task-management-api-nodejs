var JWT = require('jsonwebtoken')

const TokenDecode = (function() {
    function decodeToken(token, secret, callback) {
        try {
            return JWT.verify(token, secret)
        } catch (error) {
            return error
        }
    }

    return {
        payload: function(token, secret) {
            return decodeToken(token, secret).data
        },

        isExpired: function(token, secret) {
            return decodeToken(token, secret).name === 'TokenExpiredError'
        }
    }
})();

module.exports.encode = function(value, secret) {
    return JWT.sign({ data: JSON.stringify(value) }, secret, { expiresIn: 1800 });
}

module.exports.decode = function(token, secret) {
    return TokenDecode.payload(token, secret)
}

module.exports.isExpired = function(token, secret) {
    return TokenDecode.isExpired(token, secret)
}