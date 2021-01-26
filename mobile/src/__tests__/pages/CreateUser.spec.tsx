import React from 'react';
import { render } from '@testing-library/react-native';

import Form from '../../pages/Form';

describe('Create user page', () => {
  it('should be render Form', () => {
    render(<Form />);
  });

  it('should be contain name, document and type in inputs', () => {
    const { getByPlaceholderText } = render(<Form />);

    expect(getByPlaceholderText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('individual/business')).toBeTruthy();
    expect(getByPlaceholderText('CPF')).toBeTruthy();
  });
});
