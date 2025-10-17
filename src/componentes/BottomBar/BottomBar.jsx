import React from "react";
import { Home, Info, FileText, Rocket, Star } from "lucide-react";
import "./BottomBar.css";

export default function BottomBar({ activeTab, setActiveTab }) {
  return (
    <div className="bottom-bar">
      <button
        className={activeTab === "home" ? "active" : ""}
        onClick={() => setActiveTab("home")}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        className={activeTab === "detalles" ? "active" : ""}
        onClick={() => setActiveTab("detalles")}
      >
        <Rocket size={20} />
        <span>Detalles</span>
      </button>

      <button
        className={activeTab === "favoritos" ? "active" : ""}
        onClick={() => setActiveTab("favoritos")}
      >
        <Star size={20} />
        <span>Favoritos</span>
      </button>

      <button
        className={activeTab === "original" ? "active" : ""}
        onClick={() => setActiveTab("original")}
      >
        <FileText size={20} />
        <span>Original</span>
      </button>

      <button
        className={activeTab === "informativa" ? "active" : ""}
        onClick={() => setActiveTab("informativa")}
      >
        <Info size={20} />
        <span>Informativa</span>
      </button>
    </div>
  );
}
