import React from "react";
import "./Favoritos.css";

export default function Favoritos({ favorites, toggleFavorite, onSelectRocket }) {
  if (favorites.length === 0) {
    return (
      <div className="favoritos-container">
        <h1 className="favoritos-title">Tus Favoritos</h1>
        <p className="favoritos-empty">
          No tienes cohetes favoritos aún.  
          ¡Agrega tus favoritos desde la página principal!
        </p>
      </div>
    );
  }

  return (
    <div className="favoritos-container">
      <h1 className="favoritos-title">Tus Cohetes Favoritos</h1>
      <div className="favoritos-grid">
        {favorites.map((rocket) => (
          <div
            key={rocket.id}
            className="favoritos-card"
            onClick={() => onSelectRocket(rocket)}
          >
            <img src={rocket.flickr_images[0]} alt={rocket.name} />
            <h2>{rocket.name}</h2>
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(rocket);
              }}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
