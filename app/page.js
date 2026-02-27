import { recipes } from "./data/recipes";
import RecipeCard from "./components/RecipeCard";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <section style={landingStyle}>
        <h1 style={{fontSize:"100px"}}>SHAKTI Kitchen</h1>
        
        <p style={{width:"500px"}}>
          A digital gateway to the heart of Kerala, guiding you through
authentic spice traditions and professional Malayali techniques
to turn every meal into a masterpiece of flavor.
        </p>
        <a href="#recipes">
          <button style={startButton}>Explore Recipes</button>
        </a>
      </section>
      <section id ="recipes">
      <div style={gridStyle}>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      </section>
    </div>
  );
}

const landingStyle = {
  color:"white",
  
  height: "100vh",
  backgroundImage: 
    "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://media.istockphoto.com/id/1632495064/photo/wooden-table-top-on-blur-kitchen-room-background-modern-kitchen-room-interior.jpg?s=612x612&w=0&k=20&c=8zTlzrr7rcViyii8pZlYt8GRpanwniryKJhi-r1zf1E=')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
};
const startButton = {
  marginTop: "20px",
  padding: "10px 20px",
  cursor: "pointer",
};
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
  marginTop: "20px",
  
};