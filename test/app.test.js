const request = require('supertest');
const app = require('../app');

describe('GET /todos', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});