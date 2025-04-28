import React, { useState } from 'react';
const API_KEY = import.meta.env.API_KEY;

function App() {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);

  const searchGames = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`);
      const data = await response.json();
      setGames(data.results);
    } catch (error) {
      console.error("Fehler beim Laden der Spiele:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Suche ein Spiel</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Suchbegriff eingeben"
        style={{ marginRight: '10px' }}
      />
      <button onClick={searchGames}>Suche</button>

      <ul style={{ marginTop: '20px' }}>
        {games.map((game) => (
          <li key={game.id}>
            {game.name} ({game.released})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

