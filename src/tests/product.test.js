const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async() => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  }
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
});


test('GET /products', async () => {
  const res = await request(app).get('/news');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});


test('POST /news', async () => {
  const news = {
    headline: 'test headline',
    lead: 'test lead',
    author: 'test author',
    imageDescription: 'test imageDescription',
    date: '2024-01-23',
    body: 'test body',
  }
  const res = await request(app)
    .post('/products')
    .send(news)
    .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.headline).toBe(news.headline);
  expect(res.body.id).toBeDefined();
});

test('DELETE /products/:id', async () => {
  const res = await request(app)
    .delete(`/news/${id}`)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});

test('PUT /products/:id', async () => {
    const updatedProduct = {
      headline: 'Updated Headline',
      lead: 'Updated Lead',
      author: 'Updated Author',
      imageDescription: 'Updated Image Description',
      date: '2024-01-30',
      body: 'Updated Body',
    };
    
    const res = await request(app)
      .put(`/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedProduct);
    
    expect(res.status).toBe(200);
    expect(res.body.headline).toBe(updatedProduct.headline);
    expect(res.body.lead).toBe(updatedProduct.lead);
    expect(res.body.author).toBe(updatedProduct.author);
    expect(res.body.imageDescription).toBe(updatedProduct.imageDescription);
    expect(res.body.date).toBe(updatedProduct.date);
    expect(res.body.body).toBe(updatedProduct.body);
  });
  

