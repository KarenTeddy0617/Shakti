"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { generatePdf } from "@/lib/pdf";
import SOSButton from "@/components/SOSButton";
import "./styles/vault.css";

export default function VaultPage() {
  const DEMO_USER_ID = "11111111-1111-1111-1111-111111111111";
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/login");
    }
    checkSession();
  }, [router]);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", DEMO_USER_ID)
      .order("created_at", { ascending: false });
    if (!error) setEntries(data);
  }

  useEffect(() => { fetchEntries(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let imageUrl = null;

    try {
      if (file) {
        const fileName = `${Date.now()}.${file.name.split(".").pop()}`;
        const { error: uploadError } = await supabase.storage
          .from("journal-images")
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("journal-images")
          .getPublicUrl(fileName);
        imageUrl = publicData.publicUrl;
      }

      const { error } = await supabase.from("journal_entries").insert([
        { user_id: DEMO_USER_ID, note, image_url: imageUrl }
      ]);
      if (error) throw error;

      setNote("");
      setFile(null);
      fetchEntries();
    } catch (err) {
      console.error(err);
      alert("Failed to save note.");
    }
  }

  return (
    <div className="vault-dark">
      <h2 style={{ textAlign: "center", fontSize: "50px" }}>🔐 Secure Journal</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your secure note..."
          required
          style={{
            width: "100%",
            height: "250px",
            padding: "20px",
            margin: "20px",
            color: "white",
            backgroundColor: "#222",
            border: "1px solid #444",
            borderRadius: "8px",
            fontSize: "16px"
          }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "400px", padding: "20px", margin: "20px" }}
        />

        {/* Button Row */}
        <div className="button-row">
          <button
            type="submit"
            style={{ backgroundColor: "#00ffe7", color: "#000" }}
          >
            Save Note
          </button>

          <SOSButton
            className="sos-button"
            userId={DEMO_USER_ID}
            entries={entries}
            fetchEntries={fetchEntries}
            setEntries={setEntries}
            style={{ backgroundColor: "#ff4d4d", color: "#fff" }}
          />
        </div>
      </form>

      <hr />

      <h3>Previous Entries</h3>
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <p>{entry.note}</p>
          {entry.image_url && <img src={entry.image_url} alt="Uploaded" />}
          {entry.audio_url && (
            <audio controls>
              <source src={entry.audio_url} type="audio/webm" />
            </audio>
          )}
          <small>{new Date(entry.created_at).toLocaleString()}</small>
        </div>
      ))}

      <button
        onClick={async () => {
          const pdfBlob = await generatePdf(entries);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(pdfBlob);
          link.download = "VaultReport.pdf";
          link.click();
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Generate PDF of Vault
      </button>
    </div>
  );
}