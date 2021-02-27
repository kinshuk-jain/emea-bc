import { check } from 'prettier';
import { checkStatus } from '../fetchUtils';

const mockResponse = {
  status: 400,
  statusText: 'Hello',
  json: () => Promise.resolve('hey'),
};

describe('fetch utils', () => {
  it('should return response on valid status code', async () => {
    await expect(
      checkStatus({
        ...mockResponse,
        status: 200,
      })
    ).resolves.toStrictEqual({
      ...mockResponse,
      status: 200,
    });
  });
  it('should throw error on invalid status code', async () => {
    await expect(checkStatus(mockResponse)).rejects.toThrow();
  });
  it('should have response body in error on invalid status code', async () => {
    try {
      await checkStatus(mockResponse);
    } catch (e) {
      expect(e.status).toBe(mockResponse.status);
      expect(e.message).toBe(mockResponse.statusText);
      expect(e.response).toBe('hey');
    }
  });
});
