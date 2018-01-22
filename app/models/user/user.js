const conn = require("../connection")
const bcrypt = require("bcrypt")

const UserSchema = conn.Schema({
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(val)
            },
            message: '`{VALUE}` has wrong format'
        },
        index: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    }
    next()
})

var Model = conn.model('User', UserSchema)

Model.prototype.wrap = function() {
    return {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
    }
}

module.exports = Model