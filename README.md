<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# SHAKTI 🎯

## Basic Details

### Team Name: SyntaxSquad

### Team Members
- Member 1: Anamika M J - Govt. Model Engineering College
- Member 2: Karen Teddy Vadakkan - Govt. Model Engineering College

### Hosted Project Link
[mention your project hosted link here]

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

List the key features of your project:
- Feature 1: [Description]
- Feature 2: [Description]
- Feature 3: [Description]
- Feature 4: [Description]

---

## Implementation

### For Software:

#### Installation
```bash
[Installation commands - e.g., npm install, pip install -r requirements.txt]
```

#### Run
```bash
[Run commands - e.g., npm start, python app.py]
```

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![Screenshot1](Add screenshot 1 here with proper name)
*Add caption explaining what this shows*

![Screenshot2](Add screenshot 2 here with proper name)
*Add caption explaining what this shows*

![Screenshot3](Add screenshot 3 here with proper name)
*Add caption explaining what this shows*

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*Explain your system architecture - components, data flow, tech stack interaction*

**Application Workflow:**

![Workflow](docs/workflow.png)
*Add caption explaining your workflow*

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints

**GET /api/endpoint**
- **Description:** [What it does]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
```json
{
  "status": "success",
  "data": {}
}
```

**POST /api/endpoint**
- **Description:** [What it does]
- **Request Body:**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]


## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** [e.g., GitHub Copilot, v0.dev, Cursor, ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [Approximately X%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- [Name 1]: [Specific contributions - e.g., Frontend development, API integration, etc.]
- [Name 2]: [Specific contributions - e.g., Backend development, Database design, etc.]
- [Name 3]: [Specific contributions - e.g., UI/UX design, Testing, Documentation, etc.]

---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
