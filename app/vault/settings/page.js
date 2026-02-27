"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Settings() {
  const [selected, setSelected] = useState("");
  const [triggerCount, setTriggerCount] = useState(3);
  const [trustedEmail, setTrustedEmail] = useState("");
  const [userEmail, setUserEmail] = useState(""); // store logged-in email

  const ingredients = ["Salt", "Sugar", "Chilli", "Turmeric"];

  useEffect(() => {
    async function loadSettings() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      setUserEmail(user.email); // store email in state

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setSelected(data.trigger_word || "");
        setTriggerCount(data.trigger_count || 3);
        setTrustedEmail(data.trusted_contact_email || "");
      }
    }

    loadSettings();
  }, []);

  const handleSelect = async (item) => {
    setSelected(item);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase
      .from("users")
      .update({ trigger_word: item.toLowerCase() })
      .eq("id", user.id);
  };

  const saveSettings = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    await supabase
      .from("users")
      .update({
        email: user.email,                  // store logged-in email
        trigger_word: selected.toLowerCase(),
        trigger_count: triggerCount,
        trusted_contact_email: trustedEmail
      })
      .eq("id", user.id);

    alert("Settings Saved");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>⚙ Choose Your Trigger Ingredient</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          type="email"
          value={userEmail}
          readOnly
          style={{ padding: "8px", width: "250px", backgroundColor: "#f0f0f0" }}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <input
          type="email"
          placeholder="Trusted Contact Email"
          value={trustedEmail}
          onChange={(e) => setTrustedEmail(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <input
          type="number"
          placeholder="Trigger Count"
          value={triggerCount}
          onChange={(e) => setTriggerCount(Number(e.target.value))}
          style={{ padding: "8px", width: "120px" }}
        />
      </div>

      <button
        onClick={saveSettings}
        style={{ marginTop: "15px", padding: "8px 20px" }}
      >
        Save All Settings
      </button>

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