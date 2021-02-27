const start = require('./index');
const server = require('./app');
const csv = require('csvtojson');

jest.mock('csvtojson', () => {
  return jest.fn(() => ({
    fromFile: () => Promise.resolve('bookslist'),
  }));
});

jest.mock('./app', () => ({
  locals: {
    jsonBooks: {},
  },
  listen: jest.fn(),
}));

describe('starts server', () => {
  it('should set app local from csv', async () => {
    await start();
    expect(server.locals.jsonBooks).toBe('bookslist');
  });
  it('should start server', async () => {
    await start();
    expect(server.listen).toHaveBeenCalled();
  });
});
