"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

function Vault() {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [entries, setEntries] = useState([]);

  // ==============================
  // FETCH JOURNAL ENTRIES
  // ==============================
  async function fetchEntries() {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setEntries(data);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  // ==============================
  // SAVE JOURNAL NOTE + IMAGE
  // ==============================
  async function handleSubmit(e) {
    e.preventDefault();
    let imageUrl = null;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("evidence")
        .upload(fileName, file);

      if (!uploadError) {
        const { data } = supabase.storage
          .from("evidence")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }
    }

    const { error } = await supabase
      .from("journal_entries")
      .insert([{ note: note, image_url: imageUrl }]);

    if (!error) {
      setNote("");
      setFile(null);
      fetchEntries();
    }
  }

  // ==============================
  // SOS RECORDING LOGIC
  // ==============================

  async function triggerSOS() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();

      alert("🚨 Recording started for 30 seconds");

      setTimeout(() => {
        mediaRecorder.stop();
      }, 30000);

    } catch (error) {
      alert("Microphone permission denied or error occurred.");
      console.error(error);
    }
  }

  async function uploadAudio(blob) {
  const fileName = `audio-${Date.now()}.webm`;

  // ✅ Upload to correct bucket
  const { error: uploadError } = await supabase.storage
    .from("emergency-audio")
    .upload(fileName, blob);

  if (uploadError) {
    console.error(uploadError);
    alert("Audio upload failed.");
    return;
  }

  // ✅ Get public URL from SAME bucket
  const { data } = supabase.storage
    .from("emergency-audio")
    .getPublicUrl(fileName);

  const publicUrl = data.publicUrl;

  const { error } = await supabase.from("emergency_logs").insert([
    {
      user_id: "11111111-1111-1111-1111-111111111111",
      audio_url: publicUrl,
      emergency_active: true
    }
  ]);

  if (error) {
    console.error(error);
    alert("Failed to insert emergency log.");
  } else {
    alert("🚨 SOS recorded and stored successfully.");
  }
}

  // ==============================
  // UI
  // ==============================

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔐 Secure Journal</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your secure note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
          style={{ width: "100%", height: "100px" }}
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">Save Note</button>

        <button
          type="button"
          onClick={triggerSOS}
          style={{
            marginLeft: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "8px 15px",
            cursor: "pointer"
          }}
        >
          🚨 SOS
        </button>
      </form>

      <hr />

      <h3>Previous Entries</h3>

      {entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: "10px" }}>
          <p>{entry.note}</p>

          {entry.image_url && (
            <img
              src={entry.image_url}
              alt="Uploaded"
              style={{ width: "200px", marginTop: "5px" }}
            />
          )}

          <br />

          <small>
            {new Date(entry.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default Vault;