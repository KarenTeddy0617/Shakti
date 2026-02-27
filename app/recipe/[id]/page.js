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
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        console.error("No user logged in", userError);
        return;
      }

      const user = userData.user;

      const { data, error } = await supabase
        .from("users")
        .select("trigger_word, trigger_count")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch settings:", error);
        return;
      }

      if (data) {
        setTrigger(data.trigger_word || "Salt");
        setRequiredClicks(data.trigger_count || 3);
      }
    } catch (err) {
      console.error("Unexpected error fetching settings:", err);
    }
  }

  fetchSettings();
}, []);

  if (!recipe) return <p>Recipe not found</p>;

  function handleIngredientClick(name) {
  if (name.toLowerCase() === trigger) {
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