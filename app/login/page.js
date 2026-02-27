"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      // 1️⃣ Sign in the user
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        alert(loginError.message);
        console.error("LOGIN ERROR:", loginError);
        return;
      }

      const user = loginData.user;
      if (!user) return;

      // 2️⃣ Check if row exists in 'users' table
      const { data: userRow, error: rowError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (rowError && rowError.code === "PGRST116") {
        // Row not found → insert default row
        await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          trigger_count: 3,
          trusted_contact_email: null,
          trigger_word: null,
        });
      }

      // 3️⃣ Redirect to vault
      router.push("/vault");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong during login.");
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h1>Welcome Back</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: "block", margin: "15px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: "block", margin: "15px 0", padding: "10px", width: "100%" }}
      />
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Login
      </button>
    </div>
  );
}