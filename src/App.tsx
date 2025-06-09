// src/App.tsx
import { useState } from "react";
import GameList from "./components/GameList";

export default function App() {
  const [query, setQuery] = useState("");
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>RAWG – Spielsuche</h1>

      {/* kleine Suchleiste */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Titel eingeben …"
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "6px 10px",
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 14,
        }}
      />

      {/* Liste bekommt den aktuellen Suchbegriff */}
      <GameList search={query} />
    </main>
  );
}
