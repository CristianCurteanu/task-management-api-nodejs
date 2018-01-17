'use strict'

const fastify = require('fastify')()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/task_management')
let db = mongoose.connection;

// fastify.register(require('./app/resources/users'))
fastify.register(require('./app/endpoints/client/endpoint'))

fastify.listen(3003, function(err) {
    if (err) throw err
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
})