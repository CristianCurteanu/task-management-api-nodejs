const Client = require('../../models/client/client')
const uuid = require('uuid')
const jwt = require('../../../helpers/jwt')

module.exports = async(fastify, opts, next) => {
    fastify.post('/client', async(request, response) => {
        const Uuid = uuid.v4()
        const token = jwt.encode(request.body.email, Uuid)

        client = Client({
            email: request.body.email,
            uuid: Uuid,
            key: token
        })

        client.save((err, client) => {
            if (err) {
                response.code(400)
                return response.send({ messages: err.errors })
            } else {
                response.code(201)
                return response.send({ token: client.token })
            }
        })
    })
}