import { storage } from '../storage';

describe('storage utils', () => {
  it('should store/get item', () => {
    storage.setItem('key', 'value');
    const item = storage.getItem('key');
    expect(item).toBe('value');
  });
});
