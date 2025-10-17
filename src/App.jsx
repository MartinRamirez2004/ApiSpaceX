import React, { useState, useEffect } from "react";
import "./App.css";

import Home from "./componentes/Home/Home.jsx";
import Detalles from "./componentes/Detalles/Detalles.jsx";
import Favoritos from "./componentes/Favoritos/Favoritos.jsx";
import Original from "./componentes/Original/Original.jsx";
import Informativa from "./componentes/Informativa/Informativa.jsx";
import BottomBar from "./componentes/BottomBar/BottomBar.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [favorites, setFavorites] = useState([]);
  const [selectedRocket, setSelectedRocket] = useState(null);

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavorites(favs);
  }, []);

  // Guardar favoritos cuando cambien
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favorites));
  }, [favorites]);

  // Agregar o eliminar favoritos
  const toggleFavorite = (rocket) => {
    setFavorites((prevFavs) => {
      const exists = prevFavs.find((f) => f.id === rocket.id);
      if (exists) {
        return prevFavs.filter((f) => f.id !== rocket.id);
      } else {
        return [...prevFavs, rocket];
      }
    });
  };

  // Cuando se selecciona un cohete, se abre Detalles
  const handleSelectRocket = (rocket) => {
    setSelectedRocket(rocket);
    setActiveTab("detalles");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home
            onSelectRocket={handleSelectRocket}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        );
      case "detalles":
        return (
          <Detalles
            rocket={selectedRocket}
            onBack={() => setActiveTab("home")}
          />
        );
      case "favoritos":
        return (
          <Favoritos
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onSelectRocket={handleSelectRocket}
          />
        );
      case "original":
        return <Original />;
      case "informativa":
        return <Informativa />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <main>{renderTab()}</main>
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;

// Instalaciones hechas
// Instala Framer Motion y Lucide React para las animaciones e íconos:
// npm install framer-motion lucide-react