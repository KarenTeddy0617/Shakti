"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Settings() {
  const [ingredient, setIngredient] = useState("");
  const [tapCount, setTapCount] = useState(3);

  async function saveSettings() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    await supabase.from("user_settings").upsert({
      user_id: user.id,
      trigger_ingredient: ingredient,
      trigger_click_count: tapCount
    });

    alert("Saved!");
  }

  return (
    <div>
      <h2>Kitchen Preferences</h2>

      <select onChange={e => setIngredient(e.target.value)}>
        <option>Salt</option>
        <option>Turmeric</option>
        <option>Chilli Powder</option>
      </select>

      <input
        type="number"
        value={tapCount}
        onChange={e => setTapCount(e.target.value)}
      />

      <button onClick={saveSettings}>Save</button>
    </div>
  );
}