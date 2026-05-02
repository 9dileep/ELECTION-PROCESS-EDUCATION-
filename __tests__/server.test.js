const request = require('supertest');
const app = require('../server');

describe('Server Endpoints', () => {
  it('should return a friendly HTML message for GET /api/chat', async () => {
    const res = await request(app).get('/api/chat');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('ElectED API is running!');
  });

  it('should return 400 for POST /api/chat without question', async () => {
    const res = await request(app).post('/api/chat').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('No question provided.');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/some-unknown-route');
    expect(res.statusCode).toEqual(404);
  });
});
