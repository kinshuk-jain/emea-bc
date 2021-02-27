const request = require('supertest');
const server = require('../../../app');

describe('book detail api', () => {
  it('should return book details', async () => {
    server.locals.jsonBooks = [{ a: 1 }];
    const resp = await request(server).get('/api/books/0');
    expect(resp.body).toStrictEqual({ a: 1 });
  });

  it('should not return book details on invalid book id', async () => {
    server.locals.jsonBooks = [{ a: 1 }];
    let resp = await request(server).get('/api/books/d');
    expect(resp.status).toBe(400);
    expect(resp.body).toStrictEqual({ error: 'Invalid book id' });

    resp = await request(server).get('/api/books/123');
    expect(resp.status).toBe(400);
    expect(resp.body).toStrictEqual({ error: 'Invalid book id' });

    resp = await request(server).get('/api/books/-1');
    expect(resp.status).toBe(400);
    expect(resp.body).toStrictEqual({ error: 'Invalid book id' });
  });
});
