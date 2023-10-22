import { render } from '@testing-library/react';

import CharacterBuilder from './character-builder';

describe('CharacterBuilder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CharacterBuilder />);
    expect(baseElement).toBeTruthy();
  });
});
