import { vi, it, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GameList from '../src/components/GameList'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



test('zeigt Ladezustand an', () => {
  const client = new QueryClient();

  render(
    <QueryClientProvider client={client}>
      <GameList search="" />
    </QueryClientProvider>
  );

  expect(screen.getByText(/Lade/i)).toBeInTheDocument();
});


