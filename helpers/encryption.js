const Crypto = require('crypto');

module.exports.encodeHash = function(string, key = process.env.ENC_PASS) {
    try {
        let cypher = Crypto.createCipher('aes192', key);
        let encrypted = cypher.update(string, 'utf8', 'hex');
        encrypted += cypher.final('hex');
        return encrypted;
    } catch (e) {
        return null
    }
}

module.exports.decodeHash = function(string, key = process.env.ENC_PASS) {
    try {
        let decypher = Crypto.createDecipher('aes192', key);
        let decrypted = decypher.update(string, 'hex', 'utf8');
        decrypted += decypher.final('utf8');
        return decrypted;
    } catch (e) {
        return null
    }
}

module.exports.verify = function(token, string, key = process.env.ENC_PASS) {
    return this.encodeHash(string, key) === this.decodeHash(token, key)
}