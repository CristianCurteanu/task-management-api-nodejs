'use strict'

const fastify = require('fastify')()

fastify.register(require('./app/endpoints/client/endpoint'))
fastify.register(require('./app/endpoints/users/endpoint'))

fastify.listen(3003, function(err) {
    if (err) throw err
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
})