import React, { useEffect, useState } from "react";
import cohete from "../../assets/cohete.png";
import "./Informativa.css";

export default function Informativa() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/company");
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Error al obtener información de la API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div className="infoapi-container">
      <h1 className="infoapi-title">SpaceX API Explorer</h1>
      <p className="infoapi-author">Martin Ramirez</p>

      <div className="infoapi-image">
        <img src={cohete} alt="Cohetico" />
      </div>

      {loading ? (
        <p>Cargando información...</p>
      ) : (
        info && (
          <div className="infoapi-card">
            <p>
              <strong>Fundador:</strong> {info.founder}
            </p>
            <p>
              <strong>Año de fundación:</strong> {info.founded}
            </p>
            <p>
              <strong>Empleados:</strong> {info.employees}
            </p>
            <p>
              <strong>Ubicación:</strong> {info.headquarters.city},{" "}
              {info.headquarters.state}
            </p>
            <p>
              <strong>Resumen:</strong> {info.summary}
            </p>
          </div>
        )
      )}

        <a
          href="https://github.com/MartinRamirez2004"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/MartinRamirez2004
        </a>
        <p>Versión 1.0</p>
    </div>
  );
}
