// src/App.tsx   (oder App.jsx in TSX umbenennen)
import GameList from "./components/GameList";

export default function App() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">RAWG – Top Games</h1>
      <GameList />      {/* ← listet sofort die ersten 20 Top-Games */}
    </main>
  );
}
