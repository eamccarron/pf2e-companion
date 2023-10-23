import { render } from '@testing-library/react';

import UiSelection from './ui-selection';

describe('UiSelection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiSelection />);
    expect(baseElement).toBeTruthy();
  });
});
