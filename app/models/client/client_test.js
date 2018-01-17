var chai = require('chai')
var expect = chai.expect;
const mongoose = require('mongoose')
const Client = require('./client')

describe('Client', () => {
    describe('#save', () => {
        it('should save user with valid data', (done) => {
            data = {
                email: 'some@email.com',
                uuid: 'some-uuid-key',
                key: 'brand-new-key'
            }
            client = Client(data)
            client.save(function(err, client) {
                expect(client.email).to.equal(data.email)
            })
            done()
        })

        it('should raise an issue if email is undefined', (done) => {
            data = {
                uuid: 'some-uuid-key',
                key: 'brand-new-key'
            }
            client = Client(data)
            client.save(function(err, client) {
                expect(err).to.not.be.null
                expect(err.errors.email.message).to.be.equal('Path `email` is required')
            })
            done()
        })
    })
})