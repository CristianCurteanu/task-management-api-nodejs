process.env.NODE_ENV = "test"

let connection = require('../../models/connection').connection;
let User = require('../../models/user/user')

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../main');
let jwt = require('../../../helpers/jwt')

let expect = chai.expect;
chai.use(chaiHttp);

const URL = 'http://localhost:3003'

describe('Client resource', () => {
    beforeEach((done) => {
        connection.db.dropCollection('users')
        done()
    });

    afterEach((done) => {
        connection.db.dropCollection('users')
        done()
    });

    describe('GET user', () => {
        it('should be able to return current user', (done) => {
            process.env.JWT_KEY = 'some-key-for-jwt-encoding'
            var user = User({
                firstName: 'Johnny',
                lastName: 'Smith',
                email: 'some2@email.com',
                password: 'test!'
            })
            user.save((err, user) => {
                if (err) {
                    done()
                }
            })
            const authorization = jwt.encode({
                email: user.email,
                id: user.id,
                expireAt: Date.now() + 890000
            }, process.env.JWT_KEY)

            const request = chai.request(URL).get('/user')
                .set('Authorization', authorization)
                .send({ email: 'some@email.com' })

            request.end((err, response) => {
                expect(err).to.be.null
                expect(response.status).to.equal(200)
                expect(response.body.data.email).to.equal(user.email)
                expect(response.body.data.firstName).to.equal(user.firstName)
                expect(response.body.data.lastName).to.equal(user.lastName)
                done()
            })
        })

        it('should return 401 Unauthorized if session token expired', (done) => {
            process.env.JWT_KEY = 'some-key-for-jwt-encoding'
            var user = User({
                firstName: 'Johnny',
                lastName: 'Smith',
                email: 'some2@email.com',
                password: 'test!'
            })
            user.save((err, user) => {
                if (err) {
                    done()
                }
            })
            const authorization = jwt.encode({
                email: user.email,
                id: user.id,
                expireAt: Date.now() + 910000
            }, process.env.JWT_KEY)

            const request = chai.request(URL).get('/user')
                .set('Authorization', authorization)
                .send({ email: 'some@email.com' })

            request.end((err, response) => {
                expect(err).to.not.be.null
                done()
            })
        })
    })

})