"use client";

import Link from "next/link";

export default function RecipeCard({ recipe }) {
  return (
    <div style={cardStyle}>
      <img src={recipe.image} alt={recipe.name} style={imgStyle} />
      <h2 style={{ marginBottom: "15px" }}>{recipe.name}</h2>
      
      <p>{recipe.description}</p>
      <Link href={`/recipe/${recipe.id}`}>
        <button style={buttonStyle}>View Recipe</button>
      </Link>
    </div>
  );
}

const cardStyle = {
  border: "4px solid #fe0d76",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  
};

const imgStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px"
};

const buttonStyle = {
  marginTop: "10px",
  padding: "8px 15px",
  backgroundColor: "#ff914d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};