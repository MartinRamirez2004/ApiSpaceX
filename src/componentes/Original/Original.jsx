import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Original.css";

function Original() {
  const [rockets, setRockets] = useState([]);
  const [runners, setRunners] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isRacing, setIsRacing] = useState(false);

  // Cargar cohetes desde la API de SpaceX
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/rockets")
      .then((res) => res.json())
      .then((data) => {
        setRockets(data);
        pickRandomRockets(data);
      });
  }, []);

  // Elegir 2 cohetes aleatorios
  const pickRandomRockets = (data) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setRunners(shuffled.slice(0, 2));
    setWinner(null);
    setIsRacing(false);
  };

  // Iniciar la carrera
  const startRace = () => {
    if (runners.length < 2) return;
    setWinner(null);
    setIsRacing(true);
    const randomWinner = Math.random() < 0.5 ? runners[0] : runners[1];

    setTimeout(() => {
      setWinner(randomWinner);
      setIsRacing(false);
    }, 3500);
  };

  return (
    <div className="original-container">
      <h1 className="original-title">Carrera de Cohetes</h1>
      <p className="original-subtitle">
        Dos cohetes competirán para ver quién despega primero.
      </p>

      {runners.length === 2 && (
        <div className="race-track">
          {runners.map((rocket, i) => (
            <motion.div
              key={rocket.id}
              className="rocket-lane"
              style={{
                top: `${i * 50 + 15}%`,
              }}
            >
              <motion.div
                className="rocket"
                animate={isRacing ? { x: ["0%", "90%"] } : { x: "0%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                style={{
                  backgroundColor: i === 0 ? "#3b82f6" : "#ef4444",
                }}
              >
                <img src={rocket.flickr_images[0]} alt={rocket.name} />
                <span>{rocket.name}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {winner && (
        <motion.div
          className="winner-box"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1.1, 1], opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Ganador: <strong>{winner.name}</strong>
        </motion.div>
      )}

      <div className="btns-container">
        <button className="race-btn" onClick={startRace} disabled={isRacing}>
          {isRacing ? "Corriendo..." : "Iniciar carrera"}
        </button>
        <button
          className="reset-btn"
          onClick={() => pickRandomRockets(rockets)}
          disabled={isRacing}
        >
          Nueva carrera
        </button>
      </div>
    </div>
  );
}

export default Original;
