process.env.NODE_ENV = "test"

let connection = require('../../models/connection').connection;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../main');

let should = chai.should();
chai.use(chaiHttp);

const URL = 'http://localhost:3003'

describe('Client resource', () => {
    beforeEach((done) => {
        done()
    });

    afterEach((done) => {
        connection.db.dropDatabase(done)
    });
    describe('POST /client', () => {
        it('should have all the home resources', (done) => {
            var request = chai.request(URL).post('/client').send({ email: 'some@email.com' })
            request.end((err, response) => {
                response.should.have.json
                response.should.have.status(201);
            });
            done();
        })

        it('should return 400 if email is not set', (done) => {
            var request = chai.request(URL).post('/client').send({ email: null })
            request.end((err, response) => {
                response.should.have.status(400);
            });
            done();
        })
    });
});