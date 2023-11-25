import axios from 'axios';

import {
  alchemistClass,
  barbarianClass,
} from '@pf2-companion/libs/test/fixtures';

describe('GET /classes', () => {
  it('Should successfully fetch classes', async () => {
    const res = await axios.get('/classes');
    expect(res.status).toBe(200);
  });

  it('Should return an array of all classes', async () => {
    const res = await axios.get('/classes');
    expect(res.data).toBeInstanceOf(Array);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it('Should contain an array containing class objects', async () => {
    const res = await axios.get('/classes');
    expect(res.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(alchemistClass),
        expect.objectContaining(barbarianClass),
      ])
    );
  });
});
