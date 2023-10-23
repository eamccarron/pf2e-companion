import { DBConnection } from './db';

describe('db', () => {
  it('should not be null', () => {
    expect(DBConnection).not.toBeNull();
  });
});
