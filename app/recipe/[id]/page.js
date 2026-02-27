"use client";
"use client";
import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";
import { recipes } from "../../data/recipes";
import { supabase } from "@/lib/supabaseClient";
import { triggerSOS } from "@/app/vault/page";


export default function RecipePage() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);

  const router = useRouter();
  const [trigger, setTrigger] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [requiredClicks, setRequiredClicks] = useState(3);

  useEffect(() => {
    const saved = localStorage.getItem("triggerIngredient");
    if (saved) setTrigger(saved);
  }, []);

  useEffect(() => {
  async function fetchSettings() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const { data } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setTrigger(data.trigger_ingredient);
      setRequiredClicks(data.trigger_click_count);
    }
  }

  fetchSettings();
}, []);

  if (!recipe) return <p>Recipe not found</p>;

  function handleIngredientClick(name) {
  if (name === trigger) {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    setTimeout(() => setClickCount(0), 5000);

    if (newCount === requiredClicks) {
      router.push("/vault");
    }
  }
}

  return (
    <div style={{ padding: "20px" }}>
      <h1>{recipe.name}</h1>
      
      <p>{recipe.description}</p>
      <img src={recipe.image} alt={recipe.name} style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li
            key={index}
            onClick={() => handleIngredientClick(item)}
            style={{ cursor: "pointer" }}
          >
            {item}
          </li>
        ))}
      </ul>

      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}