import React, { useState, useEffect } from "react";
import { Search, Rocket, Star } from "lucide-react";
import "./Home.css";

export default function Home({ onSelectRocket, favorites, toggleFavorite }) {
  const [rockets, setRockets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await response.json();
        setRockets(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error al obtener cohetes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRockets();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFiltered(
      rockets.filter((rocket) => rocket.name.toLowerCase().includes(value))
    );
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <div className="home-container">
      <div className="home-header">
        <Rocket size={100} className="home-icon" />
        <h1 className="home-title">Cohetes SpaceX</h1>
        <p className="home-author">Realizado por Martin Ramirez</p>
      </div>

      <p className="home-subtitle">Explora los nombres de los cohetes</p>

      <div className="home-input-container">
        <Search className="home-search-icon" />
        <input
          type="text"
          placeholder="        Busqueda de cohetes..."
          value={query}
          onChange={handleSearch}
          className="home-input"
        />
      </div>

      {loading ? (
        <p className="home-loading">Cargando...</p>
      ) : (
        <ul className="home-list">
          {filtered.map((rocket) => (
            <li
              key={rocket.id}
              className="home-item"
              onClick={() => onSelectRocket(rocket)}
            >
              <span>{rocket.name}</span>
              <button
                className="fav-btn"
                onClick={(e) => {
                  e.stopPropagation(); // evita abrir detalles
                  toggleFavorite(rocket);
                }}
              >
                <Star
                  color={isFavorite(rocket.id) ? "gold" : "gray"}
                  fill={isFavorite(rocket.id) ? "gold" : "none"}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
