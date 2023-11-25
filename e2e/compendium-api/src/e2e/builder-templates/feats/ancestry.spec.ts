import axios from 'axios';

import { testMissingQueryParams } from '../../../testMissingQueryParams';
import {
  elfAncestry,
  dwarfAncestry,
  gnomeAncestry,
  clanLoreFeat,
  adaptiveVisionFeat,
  elvenLoreFeat,
  ancestralLongevityFeat,
} from '@pf2-companion/libs/test/fixtures';

describe('GET /builder/feats/ancestry', () => {
  testMissingQueryParams(
    ['level', 'className', 'ancestryId'],
    '/builder/feats/ancestry'
  );

  test.each(
    [
      { level: '1', className: 'alchemist', ancestryId: elfAncestry._id },
      { level: '1', className: 'Alchemist', ancestryId: elfAncestry._id },
      { level: '5', className: 'barbarian', ancestryId: dwarfAncestry._id },
      { level: '5', className: 'Barbarian', ancestryId: dwarfAncestry._id },
    ].map((params) => new URLSearchParams(params))
  )('Should work with different casing on className (%s)', async (params) => {
    const res = await axios.get(`/builder/feats/ancestry?${params}`);
    expect(res.status).toBe(200);
    expect(res.data).not.toBeNull();
    expect(res.data.length).toBeGreaterThan(0);
  });

  test.each(
    [
      { level: '3', className: 'alchemist', ancestryId: elfAncestry._id },
      { level: '4', className: 'notARealClass', ancestryId: dwarfAncestry._id },
      { level: '4', className: 'barbarian', ancestryId: 'notAnAncestryId' },
      { level: '24', className: 'alchemist', ancestryId: gnomeAncestry._id },
      { level: 'notALevel', className: 'fighter', ancestryId: elfAncestry._id },
    ].map((params) => new URLSearchParams(params))
  )(
    'Should return an empty array if no feats are available (%s)',
    async (params: URLSearchParams) => {
      const res = await axios.get(`/builder/feats/ancestry?${params}`);
      expect(res.data).toEqual([]);
    }
  );

  test.each([
    [
      new URLSearchParams({
        level: '1',
        className: 'alchemist',
        ancestryId: elfAncestry._id,
      }),
      [ancestralLongevityFeat, elvenLoreFeat],
    ],
    [
      new URLSearchParams({
        level: '5',
        className: 'barbarian',
        ancestryId: dwarfAncestry._id,
      }),
      [adaptiveVisionFeat, clanLoreFeat],
    ],
  ])(
    'Should return correct feats for class and ancestry (%s)',
    async (params, feats) => {
      const res = await axios.get(`/builder/feats/ancestry?${params}`);
      expect(res.status).toEqual(200);
      feats.forEach((feat) => {
        expect(res.data).toContainEqual(expect.objectContaining(feat));
      });
    }
  );
});
