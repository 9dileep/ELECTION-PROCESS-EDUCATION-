'use strict';

const request = require('supertest');

// Mock node-fetch before requiring the app
jest.mock('node-fetch');
const fetch = require('node-fetch');

// Set test environment before loading app
process.env.NODE_ENV = 'test';

let app;

beforeAll(() => {
  app = require('../server');
});

afterEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────
// GET /api/chat
// ─────────────────────────────────────────
describe('GET /api/chat', () => {
  it('returns a friendly HTML status page', async () => {
    const res = await request(app).get('/api/chat');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('ElectED API is running!');
  });
});

// ─────────────────────────────────────────
// POST /api/chat – Input Validation
// ─────────────────────────────────────────
describe('POST /api/chat – Input Validation', () => {
  it('returns 400 when body is empty', async () => {
    const res = await request(app).post('/api/chat').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('No question provided.');
  });

  it('returns 400 when question is an empty string', async () => {
    const res = await request(app).post('/api/chat').send({ question: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('No question provided.');
  });

  it('returns 400 when question is only whitespace', async () => {
    const res = await request(app).post('/api/chat').send({ question: '   ' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('No question provided.');
  });

  it('returns 400 when question is not a string (number)', async () => {
    const res = await request(app).post('/api/chat').send({ question: 12345 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('No question provided.');
  });

  it('returns 400 when question exceeds 500 characters', async () => {
    const longQuestion = 'a'.repeat(501);
    const res = await request(app).post('/api/chat').send({ question: longQuestion });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/too long/i);
  });

  it('accepts a question of exactly 500 characters', async () => {
    process.env.GEMINI_API_KEY = 'test-key';
    const exactQuestion = 'a'.repeat(500);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Valid answer.' }] } }]
      })
    });
    const res = await request(app).post('/api/chat').send({ question: exactQuestion });
    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe('Valid answer.');
  });
});

// ─────────────────────────────────────────
// POST /api/chat – API Key Handling
// ─────────────────────────────────────────
describe('POST /api/chat – API Key Handling', () => {
  it('returns 500 when GEMINI_API_KEY is missing', async () => {
    const original = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const res = await request(app).post('/api/chat').send({ question: 'How do I vote?' });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toContain('Gemini API key is not configured');

    process.env.GEMINI_API_KEY = original;
  });
});

// ─────────────────────────────────────────
// POST /api/chat – Gemini API Responses
// ─────────────────────────────────────────
describe('POST /api/chat – Gemini Integration', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-key-12345';
  });

  it('returns 200 with reply on successful Gemini response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'You vote in person or by mail.' }] } }]
      })
    });

    const res = await request(app).post('/api/chat').send({ question: 'How do I vote?' });
    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe('You vote in person or by mail.');
  });

  it('returns fallback text when candidates array is empty', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ candidates: [] })
    });

    const res = await request(app).post('/api/chat').send({ question: 'What is a primary?' });
    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe('No response content.');
  });

  it('returns 502 when Gemini API returns a 403 error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({ error: { message: 'Invalid API key' } })
    });

    const res = await request(app).post('/api/chat').send({ question: 'How do I vote?' });
    expect(res.statusCode).toBe(502);
    expect(res.body.error).toContain('Gemini API returned 403');
    expect(res.body.details).toBe('Invalid API key');
  });

  it('returns 504 when the fetch request times out (AbortError)', async () => {
    const abortError = new Error('The operation was aborted');
    abortError.name = 'AbortError';
    fetch.mockRejectedValueOnce(abortError);

    const res = await request(app).post('/api/chat').send({ question: 'Tell me about elections.' });
    expect(res.statusCode).toBe(504);
    expect(res.body.error).toContain('timed out');
  });

  it('returns 500 on unexpected network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network failure'));

    const res = await request(app).post('/api/chat').send({ question: 'What is the electoral college?' });
    expect(res.statusCode).toBe(500);
  });
});

// ─────────────────────────────────────────
// 404 Handler
// ─────────────────────────────────────────
describe('404 Handler', () => {
  it('returns 404 for unknown GET routes', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.statusCode).toBe(404);
    expect(res.text).toContain('404');
  });

  it('returns 404 for unknown POST routes', async () => {
    const res = await request(app).post('/api/nonexistent').send({});
    expect(res.statusCode).toBe(404);
  });
});
