const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Task, User } = require('../models');
const { todos, users, populateTodos, populateUsers } = require('./seed');

beforeEach(populateUsers);
beforeEach(populateTodos);


describe('GET /user', () => {
  it('Should return 200 - Token Provided', (done) => {
    request(app)
      .get(`/user`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it('Should return 401 - Token NOT Provided', (done) => {
    request(app)
      .get(`/user`)
      .expect(401)
      .expect((res) => {
        expect(res.body.message).toBe('Unauthorized');
      })
      .end(done);
  });
});

describe('POST /user', () => {
  const email = 'alfonsodelosrios@udem.edu';
  const password = 'google98';
  it('Should return 200 - User created', (done) => {
    request(app)
      .post('/user')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toBe(email);
      })
      .end(done);
  });
  it('Should return 404 - Missing parameters', (done) => {
    request(app)
      .post('/user')
      .expect(400)
      .end(done);
  });

  it('Should return 404 - User repeated', (done) => {
    request(app)
      .post('/user')
      .send({
        email: users[0].email,
        password
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /user/login', () => {
  it('Should return 200 - User Logged in', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeDefined();
      })
      .end(done);
  });
  it('Should return 401 - Bad password', (done) => {
    request(app)
      .post('/user/login')
      .send({
        email: users[0].email,
      })
      .expect(401)
      .end(done);
  });
});

describe('DELETE /user/logout', () => {
  it('Should return 200 - User logged out', (done) => {
    request(app)
      .delete('/user/logout')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end(done);
  });
  it('Should return 401 - No token provided', (done) => {
    request(app)
      .delete('/user/logout')
      .expect(401)
      .end(done);
  });
  it('Should return 401 - Fake token', (done) => {
    request(app)
      .delete('/user/logout')
      .set('x-auth', 'jjdskajdaksjsahdka')
      .expect(401)
      .end(done);
  });
});

describe('POST /task', () => {
  it('Should return 200 - Task submitted', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/task')
      .set('x-auth', users[0].tokens[0].token)
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Task.find().then((todos) => {
          expect(todos.length).toBe(3);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((error) => {
          done(error);
        });
      })
  });

  it('Should return 400 - Missing data', (done) => {
    request(app)
      .post('/task')
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Task.find().then((res) => {
          expect(res.length).toBe(2);
          done();
        }).catch((error) => {
          done(error);
        });
      })
  });
});

describe('GET /task', () => {
  it('Should return 200 - All tasks', (done) => {
    request(app)
      .get('/task')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /task/:id', () => {
  it('Should return 200 - Found task', (done) => {
    request(app)
      .get(`/task/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 - Not found', (done) => {
    request(app)
      .get(`/task/${new ObjectID().toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('Should return 400 - Invalid code', (done) => {
    request(app)
      .get(`/task/kdkdakkas`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });
});


describe('DELETE /task/:id', () => {
  it('Should return 200 - Deleted task', (done) => {
    request(app)
      .delete(`/task/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 - Not found', (done) => {
    request(app)
      .delete(`/task/${new ObjectID().toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('Should return 400 - Invalid code', (done) => {
    request(app)
      .delete(`/task/kdkdakkas`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });
});

describe('UPDATE /task/:id', () => {
  it('Should return 200 - Updated task', (done) => {
    request(app)
      .put(`/task/${todos[0]._id.toHexString()}`)
      .expect(200)
      .set('x-auth', users[0].tokens[0].token)
      .send({ text: 'Updated33' })
      .expect((res) => {
        expect(res.body.data.text).toBe('Updated33');
      })
      .end(done);
  });

  it('Should return 404 - Not found', (done) => {
    request(app)
      .put(`/task/${new ObjectID().toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('Should return 400 - Invalid code', (done) => {
    request(app)
      .put(`/task/kdkdakkas`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end(done);
  });
});