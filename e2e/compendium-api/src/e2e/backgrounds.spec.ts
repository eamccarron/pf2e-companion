import axios from 'axios';

describe('GET /backgrounds', () => {
  it('Should successfully get backgrounds', async () => {
    const res = await axios.get('/backgrounds');
    expect(res.status).toBe(200);
    expect(res.data).not.toBeNull();
    expect(res.data.length).toBeGreaterThan(0);
  });
});
