const mongoose = require('mongoose')

const names = {
    test: 'task_management_test',
    development: 'task_management_dev'
}
mongoose.Promise = global.Promise
const MONGO_URI = 'mongodb://localhost/' + names[process.env.NODE_ENV]
mongoose.connect(MONGO_URI, {
    useMongoClient: true,
    poolSize: 10
})

module.exports = mongoose