"use client";

import { useState, useEffect } from "react";

export default function Settings() {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("triggerIngredient");
    if (saved) setSelected(saved);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    localStorage.setItem("triggerIngredient", item);
  };

  const ingredients = ["Salt", "Sugar", "Chilli", "Turmeric"];

  return (
    <div style={{ padding: "40px" }}>
      <h1>⚙ Choose Your Trigger Ingredient</h1>

      {ingredients.map((item) => (
        <div key={item} style={{ marginTop: "15px" }}>
          <button
            onClick={() => handleSelect(item)}
            style={{
              padding: "10px 20px",
              backgroundColor: selected === item ? "#ff4da6" : "#eee",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        </div>
      ))}

      {selected && (
        <p style={{ marginTop: "20px" }}>
          Current Trigger: <strong>{selected}</strong>
        </p>
      )}
    </div>
  );
}