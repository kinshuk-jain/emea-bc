const request = require('supertest');
const server = require('../../../app');

describe('book list api', () => {
  it('should return book list', async () => {
    server.locals.jsonBooks = [{ a: 1 }];
    const resp = await request(server).get('/api/books');
    expect(resp.body).toStrictEqual([{ a: 1 }]);
  });
});
