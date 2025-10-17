import React, { useState, useEffect } from "react";
import "./Detalles.css";

export default function Detalles() {
  const [rockets, setRockets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRocket, setExpandedRocket] = useState(null);

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await response.json();
        setRockets(data);
      } catch (error) {
        console.error("Error al obtener cohetes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRockets();
  }, []);

  const toggleExpand = (id) => {
    setExpandedRocket((prev) => (prev === id ? null : id));
  };

  return (
    <div className="detalles-container">
      <h1 className="detalles-title">Detalles de Cohetes 🚀</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="detalles-grid">
          {rockets.map((rocket) => (
            <div
              key={rocket.id}
              className={`detalles-card ${
                expandedRocket === rocket.id ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(rocket.id)}
            >
              <img src={rocket.flickr_images[0]} alt={rocket.name} />
              <h2>{rocket.name}</h2>

              {expandedRocket === rocket.id && (
                <div className="detalles-info">
                  <p>{rocket.description}</p>
                  <p><strong>Primer vuelo:</strong> {rocket.first_flight}</p>
                  <p><strong>Altura:</strong> {rocket.height.meters} m</p>
                  <p><strong>Diámetro:</strong> {rocket.diameter.meters} m</p>
                  <p><strong>País:</strong> {rocket.country}</p>
                  <p><strong>Activo:</strong> {rocket.active ? "Sí" : "No"}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
