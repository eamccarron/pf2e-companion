import axios from 'axios';

describe('GET /ancestries', () => {
  it('Should successfully get ancestries', async () => {
    const res = await axios.get('/ancestries');
    expect(res.status).toBe(200);
    expect(res.data).not.toBeNull();
    expect(res.data.length).toBeGreaterThan(0);
  });
});
