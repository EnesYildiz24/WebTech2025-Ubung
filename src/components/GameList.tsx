import { useMemo } from "react";
import { useGames } from "../hooks/useGames";
import { Game, GamesResponse } from "../types/rawg";

export default function GameList({ search = "" }: { search: string }) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGames(); 

  const pages = data?.pages ?? [];
  const allGames = useMemo(
    () => pages.flatMap((p: GamesResponse) => p.results),
    [pages]
  );

  const tokens = useMemo(
    () =>
      search
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    [search]
  );

  const gamesSorted = useMemo(() => {
    const uniq = [...new Map(allGames.map((g) => [g.id, g])).values()];
    const byRating = uniq.sort((a, b) => b.rating - a.rating);

    return tokens.length
      ? byRating.filter((g) =>
          tokens.every((t) => g.name.toLowerCase().includes(t))
        )
      : byRating;
  }, [allGames, tokens]);

  if (error) return <p>Fehler: {(error as Error).message}</p>;
  if (!data) return <p>Lade …</p>;

  return (
    <>
      <div className="game-grid">
        {gamesSorted.map((g: Game) => (
          <article key={g.id} className="game-card">
            {g.background_image && (
              <img src={g.background_image} alt={g.name} />
            )}
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {g.name}
              </div>
              <div style={{ color: "#666", fontSize: 12 }}>
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
          style={{
            marginTop: 16,
            padding: "6px 12px",
            borderRadius: 8,
            background: "#4f46e5",
            color: "#fff",
          }}
        >
          {isFetchingNextPage ? "Lade …" : "Mehr laden"}
        </button>
      )}
    </>
  );
}
