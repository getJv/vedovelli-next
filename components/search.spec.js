import Search from './search';
import { render, screen } from '@testing-library/react';

describe('Search', () => {
  it('should render Search component', function () {
    render(<Search></Search>);
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });
});
