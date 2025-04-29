// src/components/GameList.tsx
import { InfiniteData } from "@tanstack/react-query";
import { useGames } from "../hooks/useGames";
import { GamesResponse, Game } from "../types/rawg";

export default function GameList() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGames();

  if (error) return <p>Fehler: {(error as Error).message}</p>;
  if (!data)   return <p>Lade …</p>;

// GameList.tsx
const games = data.pages.flatMap(p => p.results);
const uniqueSorted = [...new Map(games.map(g => [g.id, g])).values()]
  .sort((a, b) => b.rating - a.rating);  // falls du trotzdem sortieren willst

return (
  <>
    <div className="game-grid">
      {uniqueSorted.map(g => (
        <article key={g.id} className="game-card">
          {g.background_image && (
            <img src={g.background_image} alt={g.name} />
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {g.name}
            </div>
            <div style={{ color: "#666" }}>
              {g.released ?? "TBA"} · ⭐ {g.rating}
            </div>
          </div>
        </article>
      ))}
    </div>

    {hasNextPage && (
      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        style={{ marginTop: 16, padding: "6px 12px", borderRadius: 8, background: "#4f46e5", color: "#fff" }}
      >
        {isFetchingNextPage ? "Lade …" : "Mehr laden"}
      </button>
    )}
  </>
);

}
