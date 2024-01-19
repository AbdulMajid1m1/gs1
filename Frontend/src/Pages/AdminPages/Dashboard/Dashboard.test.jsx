import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders profile link for each item in the data', () => {
  const response = {
    data: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ],
  };

  render(<Dashboard response={response} />);

  response.data.forEach((item) => {
    const profileLink = screen.getByRole('link', { name: `View registered member ${item.id}` });
    expect(profileLink).toBeInTheDocument();
  });
});