// components/SOSButton.jsx
"use client";
import { supabase } from "@/lib/supabaseClient";
import { getLocation } from "@/lib/geolocation"; // optional helper
import { generatePdf } from "@/lib/pdf";

export default function SOSButton({ userId, entries, fetchEntries, setEntries }) {
  async function triggerSOS() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      alert("🚨 Recording started for 10 seconds");
      setTimeout(() => mediaRecorder.stop(), 10000);

    } catch (err) {
      console.error(err);
      alert("Microphone error or permission denied.");
    }
  }

  async function uploadAudio(blob) {
    try {
      const fileName = `audio-${Date.now()}.webm`;
      const location = await getLocation();

      // Fetch latest entry
      const { data: latestEntry } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      // Upload audio
      const { error: uploadError } = await supabase.storage.from("emergency-audio").upload(fileName, blob);
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage.from("emergency-audio").getPublicUrl(fileName);
      const publicUrl = publicData.publicUrl;

      // Update entries with audio
      const updatedEntries = entries.map((e) =>
        e.id === latestEntry.id ? { ...e, audio_url: publicUrl } : e
      );

      // Generate PDF
      const pdfBlob = await generatePdf(updatedEntries);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "VaultReport.pdf";
      link.click();

      // Insert emergency log
      const { error } = await supabase.from("emergency_logs").insert([{
        user_id: userId,
        audio_url: publicUrl,
        emergency_active: true,
        latitude: location.lat,
        longitude: location.lng,
        latest_note: latestEntry?.note,
      }]);

      if (error) throw error;

      alert("🚨 SOS recorded and PDF generated!");
      fetchEntries();
    } catch (err) {
      console.error(err);
      alert("Error during SOS process.");
    }
  }

  return (
    <button
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
  );
}