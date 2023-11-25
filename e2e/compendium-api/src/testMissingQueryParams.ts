import axios from 'axios';

import { findCombinations } from '@pf2-companion/utils';

export const testMissingQueryParams = (
  requiredParams: Array<string>,
  route: string
) => {
  const combinations = findCombinations(
    requiredParams,
    requiredParams.length - 1
  );

  const testCases = combinations.map(
    (combination) =>
      `${route}?${combination.map((param) => `${param}=test`).join('&')}`
  );

  test.each(testCases)(
    'Should return 400 if missing parameter (%s)',
    async (testCase) => {
      const res = await axios.get(testCase);
      expect(res.status).toEqual(400);
    }
  );
};
