var chai = require('chai')
var expect = chai.expect;
const mongoose = require('mongoose')
const User = require("./user")
const connection = require('../connection').connection

describe('User', () => {
    beforeEach((done) => {
        connection.db.dropCollection('users')
        data = {
            firstName: 'Johnny',
            lastName: 'Smith',
            email: 'some2@email.com',
            password: 'test!'
        }
        user = User(data)
        user.save((err, user) => {
            done()
        })
    });

    afterEach((done) => {
        connection.db.dropCollection('users')
        done()
    })
    describe('#save', () => {
        it('should save user which have valid data', (done) => {
            data = {
                firstName: 'John',
                lastName: 'Smith',
                email: 'some@email.com',
                password: 'test!'
            }
            user = User(data)
            user.save((err, user) => {
                expect(user.email).to.be.equal(data.email)
                expect(user.password).to.not.equal(data.password)
                done()
            })
        })
    })

    describe("#findById", () => {
        it('should be able to find User by id', (done) => {
            User.findById(user.id, function(err, user) {
                expect(user.email).to.be.equal(data.email)
            })

            User.findById(232, function(err, user) {
                expect(user).to.be.equal(undefined)
                done()
            })
        })
    })

    describe('#update', () => {
        it('should be able to update a user if valid datas are user', (done) => {
            user.firstName = 'Trevor'
            user.save((err, user) => {
                expect(user.firstName).to.be.equal('Trevor')
                done()
            })
        })

        it('should be able to update password w/o specifying all other fields', (done) => {
            const match = user.password
            user.password = 'test2!'
            user.save((err, user) => {
                expect(user.password).to.not.equal(match)
            })
            done()
        })
    })


})