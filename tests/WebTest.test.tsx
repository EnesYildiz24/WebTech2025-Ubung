import { vi, it, expect, test, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import GameList from '../src/components/GameList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const mockGames = [
  { id: 1, name: 'Game 1', rating: 5, released: '2024-01-01', background_image: 'image1.jpg' },
  { id: 2, name: 'Game 2', rating: 4, released: '2025-01-01', background_image: 'image2.jpg' },
  { id: 3, name: 'Mario Kart', rating: 3, released: null, background_image: null },
];

beforeEach(() => {
  vi.resetModules();
});


test('zeigt Ladezustand an', () => {
  const client = new QueryClient();

  render(
    <QueryClientProvider client={client}>
      <GameList search="" />
    </QueryClientProvider>
  );

  expect(screen.getByText(/Lade/i)).toBeInTheDocument();
});



test('zeigt die Spiele an', async () => {
  vi.doMock('../src/hooks/useGames', () => ({
    useGames: () => ({
      data: { pages: [{ results: mockGames }] },
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    }),
  }));
  const { default: GameList } = await import('../src/components/GameList');
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <GameList search="" />
    </QueryClientProvider>
  );
  expect(screen.getByText('Game 1')).toBeInTheDocument();
  expect(screen.getByText('Game 2')).toBeInTheDocument();
});



test('zeigt Fehler an wenn es Probleme gibt', async () => {
  vi.doMock('../src/hooks/useGames', () => ({
    useGames: () => ({
      data: null,
      error: new Error('Fehler beim Laden der Daten'),
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    }),
  }));
  const { default: GameList } = await import('../src/components/GameList');
  const client = new QueryClient();

  render(
    <QueryClientProvider client={client}>
      <GameList search="" />
    </QueryClientProvider>
  );

  expect(await screen.findByText(/Fehler: Fehler beim Laden der Daten/i)).toBeInTheDocument();
});


test('filtert Spiele nach dem Suchbegriff Mario', async () => {
  vi.doMock('../src/hooks/useGames', () => ({
    useGames: () => ({
      data: { pages: [{ results: mockGames }] },
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    }),
  }));
  const { default: GameList } = await import('../src/components/GameList');
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <GameList search="Mario" />
    </QueryClientProvider>
  );
  expect(screen.getByText('Mario Kart')).toBeInTheDocument();
  expect(screen.queryByText('Game 1')).not.toBeInTheDocument();
});



test('ruft fetchNextPage auf, wenn "Mehr laden" geklickt wird', async () => {
  const fetchNextPage = vi.fn();
  vi.doMock('../src/hooks/useGames', () => ({
    useGames: () => ({
      data: { pages: [{ results: mockGames }] },
      error: null,
      fetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    }),
  }));
  const { default: GameList } = await import('../src/components/GameList');
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <GameList search="" />
    </QueryClientProvider>
  );
  fireEvent.click(screen.getByRole('button', { name: /Mehr laden/i }));
  expect(fetchNextPage).toHaveBeenCalled();
});