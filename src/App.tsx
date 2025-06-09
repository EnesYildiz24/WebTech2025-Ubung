// src/App.tsx
import { useState } from "react";
import GameList from "./components/GameList";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>RAWG – Spielsuche</h1>

      <button
        onClick={() => {
          throw new Error("This is your first error!");
        }}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          background: "#ef4444",
          color: "#fff",
          marginBottom: 20,
        }}
      >
        Break the world
      </button>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Titel eingeben …"
      />

      <GameList search={query} />
    </main>
  );
}
