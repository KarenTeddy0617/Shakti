"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function Vault() {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [entries, setEntries] = useState([]);
  const router = useRouter();
  // ==============================
  // USER EXISTENCE CHECKING
  // ==============================
  
  useEffect(() => {
  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
    }
  }

  checkSession();
}, [router]);


  const DEMO_USER_ID = "11111111-1111-1111-1111-111111111111";

  // ==============================
  // FETCH JOURNAL ENTRIES
  // ==============================
  async function fetchEntries() {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setEntries(data);
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

  try {
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Upload image
      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("journal-images")
          .upload(fileName, file);

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        alert("Image upload failed.");
        return;
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("journal-images")
        .getPublicUrl(fileName);

      imageUrl = publicData.publicUrl;

      console.log("IMAGE URL:", imageUrl);
    }

    // Insert journal entry
    const { error } = await supabase
      .from("journal_entries")
      .insert([
        {
          user_id: DEMO_USER_ID,
          note,
          image_url: imageUrl,
        },
      ]);

    if (error) {
      console.error("DB INSERT ERROR:", error);
      alert("Failed to save journal entry.");
      return;
    }

    setNote("");
    setFile(null);
    fetchEntries();

  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

  // ==============================
  // GET GPS LOCATION
  // ==============================
  async function getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => reject(error),
        { enableHighAccuracy: true }
      );
    });
  }

  // ==============================
  // TRIGGER SOS RECORDING
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

  // ==============================
  // UPLOAD AUDIO + CREATE EMERGENCY LOG
  // ==============================
  async function uploadAudio(blob) {
    try {
      const fileName = `audio-${Date.now()}.webm`;

      // 1️⃣ Get GPS
      const location = await getLocation();

      // 2️⃣ Get latest journal entry
      const { data: latestEntry } = await supabase
        .from("journal_entries")
        .select("note")
        .eq("user_id", DEMO_USER_ID)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      // 3️⃣ Upload audio
      const { error: uploadError } = await supabase.storage
        .from("emergency-audio")
        .upload(fileName, blob);

      if (uploadError) {
        console.error(uploadError);
        alert("Audio upload failed.");
        return;
      }

      const { data } = supabase.storage
        .from("emergency-audio")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // 4️⃣ Insert emergency log
      const { error } = await supabase.from("emergency_logs").insert([
        {
          user_id: DEMO_USER_ID,
          audio_url: publicUrl,
          emergency_active: true,
          latitude: location.lat,
          longitude: location.lng,
          latest_note: latestEntry?.note,
        },
      ]);

      if (error) {
        console.error(error);
        alert("Failed to insert emergency log.");
      } else {
        alert("🚨 SOS recorded and stored successfully.");
      }

    } catch (err) {
      console.error(err);
      alert("Location permission denied or error occurred.");
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
            cursor: "pointer",
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
