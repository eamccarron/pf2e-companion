import axios from 'axios';

import { testMissingQueryParams } from '../../../testMissingQueryParams';
import {
  farLobberFeat,
  alchemicalFamiliarFeat,
  acuteVisionFeat,
  ragingThrowerFeat,
} from '@pf2-companion/libs/test/fixtures';

describe('GET /builder/feats/class', () => {
  testMissingQueryParams(['level', 'className'], '/builder/feats/class');

  test.each(
    [
      { level: '3', className: 'alchemist' },
      { level: '1', className: 'notARealClass' },
      { level: '25', className: 'alchemist' },
      { level: 'notALevel', className: 'alchemist' },
    ].map((params) => new URLSearchParams(params))
  )(
    'Should return an empty array if no feats are available (%s)',
    async (params: URLSearchParams) => {
      const res = await axios.get(`/builder/feats/class?${params}`);
      expect(res.status).toEqual(200);
      expect(res.data).toEqual([]);
    }
  );

  test.each(
    [
      { level: '1', className: 'alchemist' },
      { level: '1', className: 'Alchemist' },
      { level: '14', className: 'barbarian' },
      { level: '14', className: 'Barbarian' },
    ].map((params) => new URLSearchParams(params))
  )('Should work with different casing on className (%s)', async (params) => {
    const res = await axios.get(`/builder/feats/class?${params}`);
    expect(res.status).toEqual(200);
    expect(res.data).not.toBeNull();
    expect(res.data.length).toBeGreaterThan(0);
  });

  test.each([
    [
      new URLSearchParams({ level: '1', className: 'alchemist' }),
      [farLobberFeat, alchemicalFamiliarFeat],
    ],
    [
      new URLSearchParams({ level: '14', className: 'barbarian' }),
      [acuteVisionFeat, ragingThrowerFeat],
    ],
  ])('Should return correct feats for class (%s)', async (params, feats) => {
    const res = await axios.get(`/builder/feats/class?${params}`);
    expect(res.status).toEqual(200);
    feats.forEach((feat) => {
      expect(res.data).toContainEqual(expect.objectContaining(feat));
    });
  });

  // it('Should send code 400 if query parameters are missing', async () => {
  //   const res = await axios.get('/builder/feats/class');
  //   expect(res.status).toBe(400);
  // });

  // it('Should send code 400 if level query parameter is missing');

  // it('Should return an array of all classes', async () => {
  //   const res = await axios.get('/classes');
  //   expect(res.data).toBeInstanceOf(Array);
  //   expect(res.data.length).toBeGreaterThan(0);
  // });

  // it('Should contain an array containing class objects', async () => {
  //   const res = await axios.get('/classes');
  //   expect(res.data).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining(alchemistClass),
  //       expect.objectContaining(barbarianClass),
  //     ])
  //   );
  // });
});
