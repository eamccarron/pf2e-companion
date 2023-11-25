import axios from 'axios';

import { elfAncestry } from '@pf2-companion/libs/test/fixtures';

describe('GET /heritages', () => {
  it('Should send code 400 if missing ancestryId parameter', async () => {
    const res = await axios.get('/heritages/');
    expect(res.status).toBe(400);
  });

  it('Should get heritages for ancestry by ancestryId', async () => {
    const res = await axios.get(`/heritages/${elfAncestry._id}`);

    expect(res.status).toBe(200);
    expect(res.data).not.toBeNull();
    expect(res.data.length).toBeGreaterThan(0);
  });
});
