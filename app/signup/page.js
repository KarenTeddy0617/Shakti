"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  async function handleSignup() {
    // 1️⃣ Sign up user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      alert(signUpError.message);
      console.log(signUpError.message);
      return;
    }

    // 2️⃣ Insert a row into 'users' table for the new user
    if (signUpData.user) {
      try {
        await supabase.from("users").insert({
          id: signUpData.user.id,           // UID from auth
          email: signUpData.user.email,
          trigger_count: 3,                 // default value
          trusted_contact_email: null,
          trigger_word: null
        });
      } catch (insertError) {
        console.error("Error inserting user row:", insertError);
      }
    }

    // 3️⃣ Redirect to login
    router.push("/login");
  }

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h1>Create Account</h1>
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
        onClick={handleSignup}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Sign Up
      </button>
    </div>
  );
}