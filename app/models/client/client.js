const conn = require('../connection')


const clientSchema = conn.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(val)
            },
            message: '`{VALUE}` has wrong format'
        }
    },
    uuid: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
})

module.exports = conn.model('Client', clientSchema)