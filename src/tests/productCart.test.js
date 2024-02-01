const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');

let token;
let id;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  }
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});

test('GET /cart', async () => {
  const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /favorites', async () => {
  const news = await News.create({
    headline: 'test headline',
    lead: 'test lead',
    author: 'test author',
    imageDescription: 'test imageDescription',
    date: '2024-01-23',
    body: 'test body',
  });
  const cart = {
    quantity: 5,
    productId: news.id,
  }
  const res = await request(app)
    .post('/cart')
    .send(cart)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  await news.destroy();
  expect(res.status).toBe(201);
  expect(res.body.rate).toBe(favorite.rate);
  expect(res.body.id).toBeDefined();
});

test('DELETE /cart/:id', async () => {
  const res = await request(app)
    .delete(`/cart/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});