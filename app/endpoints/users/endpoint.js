const User = require('../../models/user/user')
const authHandler = require('../../../helpers/authorization')

module.exports = async(fastify, opts, next) => {
    const authorized = {
        beforeHandler: authHandler
    }

    fastify.get('/user', authorized, async(request, response) => {
        User.findById(request.decoded.id).exec().then((user) => {
            if (!user) {
                return User.findOne({ email: request.decoded.email }).exec()
            } else {
                response.code(200)
                return response.send({ data: user.wrap() })
            }
        }).then((user) => {
            if (!user) {
                response.code(401)
                return response.send({ error: 'Unauthorized' })
            } else {
                response.code(200)
                return response.send({ data: user.wrap() })
            }
        }).catch((err) => {
            response.code(500)
            return response.send({ error: 'Internal server error' })
        })
    })
}