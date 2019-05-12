var chai = require('chai');
var mongoose = require('mongoose');
var chaiHttp = require('chai-http');
var server = require('../index'); // my express app
var should = chai.should();
const User = require('../model/userModel')
var db = require('../config/database')
chai.use(chaiHttp);

describe('API Tests', function () {

  describe('Users', function () {
    it('should list ALL user on /v1/user GET', function (done) {
      this.timeout(500);
      setTimeout(done, 300);
      chai.request(server)
        .get('/v1/user')
        .end(function (err, res) {
          try {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

          } catch (error) {
            done(error);
          }

        });
    });
  });
  describe('user', function () {
  it('should list a single user on /v1/user/<id> GET', function (done) {
    this.timeout(500);
    setTimeout(done, 300);
    chai.request(server)
      .get('/v1/user')
      .end(function (err, res) {
        chai.request(server)
          .get('/v1/user/' + res.body[0]._id)
          .end(function (error, res) {
            try {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            } catch (error) {
              done(error)
            }

          });
      });
  });
})

describe('update user', function () {
  it('should list a single user on /v1/user/<id> PUT', function (done) {
    this.timeout(500);
    setTimeout(done, 300);
    chai.request(server)
      .get('/v1/user')
      .end(function (err, res) {
        chai.request(server)
          .put('/v1/user/' + res.body[0]._id)
          .send({username: 'ajay@qexon.com', passsword: '12345678'})
          .end(function (error, res) {
            try {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            } catch (error) {
              done(error)
            }

          });
      });
  });
})

describe('signup user', function () {
  it('should  user register on /v1/user/signup POST', function (done) {
    this.timeout(500);
    setTimeout(done, 300);
    const newUser = { "email": "test@gm.com", "password": "test123" };

        chai.request(server)
          .post('/v1/user/signup')
          .send(newUser)
          .end(function (error, res) {
            try {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            } catch (error) {
              done(error)
            }
      });
  });
});
describe('login user', function () {
  it('should  user login on /v1/user/login POST', function (done) {
    this.timeout(500);
    setTimeout(done, 300);
    const newUser = { "email": "test@gm.com", "password": "test123" };

        chai.request(server)
          .post('/v1/user/login')
          .send(newUser)
          .end(function (error, res) {
            try {
              res.should.have.status(200);
              res.body.should.be.a('object');
              done();
            } catch (error) {
              done(error)
            }
      });
  });
})
});