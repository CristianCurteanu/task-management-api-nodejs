const mongoose = require('mongoose')

const names = {
    test: 'task_management_test',
    development: 'task_management_dev'
}

mongoose.connect('mongodb://localhost/' + names[process.env.NODE_ENV])

module.exports = mongoose