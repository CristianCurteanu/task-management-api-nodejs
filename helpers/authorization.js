const jwt = require('./jwt')

const checkAuthorization = (request, response, done) => {
    request.decoded = JSON.parse(jwt.decode(request.headers.authorization, process.env.JWT_KEY))
    if (!request.decoded.expireAt) {
        response.code(401)
        return response.send({ error: 'Unauthorized' })
    } else if (request.decoded.expireAt - Date.now() >= 900000) {
        response.code(401)
        return response.send({ error: 'Unauthorized' })
    }
    done()
}

module.exports = checkAuthorization