const request = require('supertest');
const app = require('../app');
require('../models')

let id;
let token;


// ENDPOINTS PUBLICOS

test('POST /users', async () => {
  const user = {
    firstName: "Andres",
    lastName: "Vasquez",
    email: "andres2704@gmail.com",
    password: "andres1234",
    phone: "954356457",
  }
  const res = await request(app).post('/users').send(user);
  console.log(res.body);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(user.firstName);
  expect(res.body.id).toBeDefined();
});

test('POST /users/login', async () => {
  const credentials = {
    email: 'andres2704@gmail.com',
    password: 'andres1234',
  }
  const res = await request(app)
    .post('/users/login')
    .send(credentials);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.user.email).toBe(credentials.email);
  expect(res.body.token).toBeDefined();
});

test('POST /users/login con credenciales incorrectas', async () => {
  const credentials = {
    email: 'incorrecto@gmail.com',
    password: 'incorrecto1234',
  }
  const res = await request(app)
    .post('/users/login')
    .send(credentials);
  expect(res.status).toBe(401);
});




// ENDPOINTS PRIVADOS

test('GET /users', async () => {
  const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
  const userUpdated = {
    firstName: 'valentina actualizada',
  }
  const res = await request(app)
    .put(`/users/${id}`)
    .send(userUpdated)
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(userUpdated.firstName);
});

test('DELETE /users/:id', async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});