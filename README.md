<img width="1915" height="898" alt="image" src="https://github.com/user-attachments/assets/b515aa5f-df1c-46a5-83a3-7d44d6433f10" /><p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# SHAKTI 🎯

## Basic Details

### Team Name: SyntaxSquad

### Team Members
- Member 1: Anamika M J - Govt. Model Engineering College
- Member 2: Karen Teddy Vadakkan - Govt. Model Engineering College

### Hosted Project Link
https://shakti-two.vercel.app

### Project Description
A stealthy, modular safety and monitoring system disguised as a normal cooking/recipe web app (“Kerala Kitchen”). Designed for emergency capture, evidence collection, and alerting trusted contacts without raising suspicion. Ideal for hackathon demo with strong stealth UX.

### The Problem statement
In unsafe situations, victims often cannot openly call for help or capture evidence without escalating danger. Most existing safety apps are obvious, making it risky for the user when the aggressor is nearby. There is a need for a *stealthy, invisible safety system* that can:

- Be disguised as a normal app (like a cooking/recipe app)  
- Allow hidden emergency triggering  
- Automatically capture evidence (text, audio, GPS)  
- Alert trusted contacts silently  
- Store all data securely with timestamps and location  

SHAKTI solves this problem by providing a dual-layer solution for *passive protection* and *active emergency response*, ensuring users can stay safe without drawing attention.

### The Solution
SHAKTI provides a stealthy, modular safety system disguised as a normal cooking/recipe app. It solves the problem by combining *passive protection* and *active emergency response*:

1. Passive Protection (Hidden Vault) 
   - Users can store notes, photos, and audio entries securely. (It also shows the previous history)
   - All entries are timestamped and GPS-tagged automatically.  
   - Everything is cloud-synced, yet hidden behind a normal-looking app interface.

2. Active Emergency (SOS Trigger) 
   - A hidden trigger (e.g., triple-tap on a selected ingredient) silently activates emergency mode.  
   - Automatically captures the user’s location and ~30 seconds of audio.  
   - Flags the emergency and sends a secure alert to trusted contacts with access to a monitor dashboard.


## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: JavaScript 
- Frameworks used: React,Supabase (Authentication, Realtime Database, Storage)
- Libraries used: - axios / fetch (API calls)  ,pyttsx3, speech_recognition (optional audio handling) ,geopy or browser Geolocation API (GPS capture) ,react-router-dom (frontend routing) ,TailwindCSS or custom CSS for light/dark theme
- Tools used: VS Code,Git


## Features
- **Disguised Interface**: Appears as a normal cooking/recipe app to avoid suspicion.  
- **Hidden Vault (Passive Protection)**: Securely stores notes, photos, and audio entries with timestamps and GPS data.  
- **SOS Trigger (Active Emergency)**: Hidden activation (e.g., triple-tap on a selected ingredient) to silently capture location and audio, and alert trusted contacts.  
- **Monitor Dashboard**: Trusted contacts can view the latest emergency, play recorded audio, see location, and optionally track risk trends.  
- **Customizable Trigger Settings**: Users can choose their secret ingredient and number of taps to activate SOS.  
- **Stealthy Notifications**: Alerts trusted contacts without revealing the user’s actions to any observer.


## Implementation

### For Software:

## Implementation

### Installation


# Clone the repository
git clone https://github.com/your-username/shakti.git
cd shakti

# Install dependencies (Next.js + Supabase + pdf-lib)
npm install
# Start Next.js development server
npm run dev

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)
https://drive.google.com/file/d/1JvGlhLB_YjUqr4Ryyyb6AdAh0gadO4vD/view?usp=sharing
https://drive.google.com/file/d/12WvaNwCcL3gaUB0pg3fOyWIkDYobyEL4/view?usp=sharing
https://drive.google.com/file/d/1acbfZgK3IiyN1PHg41RUffz3rVpQGFGh/view?usp=sharing
https://drive.google.com/file/d/13XirEAwttXavyzxyxDhFubQm7fnu4doR/view?usp=sharing
https://drive.google.com/file/d/1p2rC-u2Yw9Rdp4en9868o539CBrS3DVW/view?usp=sharing
https://drive.google.com/file/d/1CIXGmAS7p9qDf5i3HE2jvaLCwu4evNaZ/view?usp=sharing
https://drive.google.com/file/d/1u0lcf_COMxLuYfa1oWDg7TsrBFga7Ya3/view?usp=sharing
https://drive.google.com/file/d/1E5IKGEQsWB7H-b5XJ3ZPKFVhmZiiKmjY/view?usp=sharing


#### Diagrams

**System Architecture:**
+-------------------+        +-------------------+       +-------------------+
|                   |        |                   |       |                   |
|   Next.js Frontend | <----> |  Supabase Backend | <---->|  Supabase Storage |
| (Cooking UI +     |        | (Auth + Database) |       |  (Photos, Audio, |
|  SOS Triggers,    |        |                   |       |   PDFs)           |
|  Vault, PDF-lib)  |        |                   |       |                   |
+-------------------+        +-------------------+       +-------------------+
          |
          v
+-------------------+
| Monitor Dashboard |
| (Trusted Contact) |
---------------------
Frontend

Built with Next.js (React)

Disguised UI: Kerala Kitchen Recipe App

Hidden gesture-based SOS trigger

Backend

Supabase

Authentication

Realtime Database

Storage (audio, images)

Row-Level Security (RLS)

External APIs

Browser Geolocation API (GPS capture)

MediaRecorder API (audio capture)

**Application Workflow:**
1️⃣ Normal Mode (Disguised Cooking App)

User browses recipes → Looks completely normal.

2️⃣ Hidden Vault Mode

User secretly stores:

Notes

Photos

Audio logs
All entries:

Timestamped

GPS tagged

Stored securely in Supabase

3️⃣ SOS Trigger

User triple-taps selected ingredient →

Location captured

30-sec audio recorded

Emergency flagged in database

Trusted contact notified

4️⃣ Monitor Dashboard

Trusted contact can:

View emergency status

See GPS location

Play recorded audio

Track previous incidents

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints
GET /api/sos/latest

Description: Fetch latest emergency record

Response:

{
  "status": "success",
  "data": {
    "location": "12.9716, 77.5946",
    "timestamp": "2026-02-28T18:30:00Z",
    "audio_url": "https://supabase.storage/xyz"
  }
}
POST /api/sos/trigger

Description: Trigger emergency capture

Request:

{
  "user_id": "uuid",
  "location": "lat,long"
}

Response:

{
  "status": "success",
  "message": "SOS activated"
}


## Project Demo

### Video
https://drive.google.com/file/d/1Br0dKVkBY6gnebeTJRUe1-F5XUmB2DQN/view?usp=drivesdk

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** ChatGPT,Gemini

**Purpose:** [What you used it for]
Debugging assistance for async functions,Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

Anamika -Frontend
Karen-Database and connectivity

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
