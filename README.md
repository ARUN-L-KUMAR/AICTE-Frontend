# 🌐 AICTE-Edunet Frontend Web Development Projects

Welcome to the **AICTE-Edunet Frontend Web Development Projects** repository. This repository showcases a collection of modern, responsive, and interactive frontend applications built using HTML5, CSS3, and JavaScript (ES6+).

---

## 🎬 Main Project: Movie-Review-Platform

**Folder:** [`/Movie-Review-Platform`](./Movie-Review-Platform)

**Movie-Review-Platform** is a premium, feature-rich movie discovery and review platform. It leverages external APIs and local persistence to deliver a seamless, application-like user experience.

### 🌟 Key Features
*   **OMDb API Integration:** Real-time search with autocompletion and dynamic movie data fetching.
*   **Interactive Review System:** Rate movies using a 5-star interactive component and write full text reviews.
*   **User Profile Dashboard:** Personal profile management with custom avatars and automated achievement badges/statistics.
*   **Theme Engine:** Seamless switching between polished Dark Mode and Light Mode.
*   **Watchlist & Favorites:** Save films to custom collections stored locally.
*   **Data Persistence:** Uses local storage to save reviews, watchlists, and profile details without requiring a backend database.

### 🛠️ Technology Stack
*   **Core:** HTML5, CSS3 (Custom Variables, Flexbox/Grid, Glassmorphism UI)
*   **Logic:** Modern JavaScript (ES6+, Async/Await, LocalStorage API)
*   **API:** OMDb Movie API

---

## 💡 Optional Projects

In addition to the main Movie-Review-Platform application, this repository includes two optional frontend applications demonstrating various concepts in API integration, PWA technologies, and multi-view state management.

### 1. 🧠 Online Quiz Application
**Folder:** [`/Online Quiz Application`](./Online%20Quiz%20Application)

An interactive, timed quiz game designed to test user knowledge across different categories and difficulty levels.

*   **Dynamic Questions:** Fetches trivia from the Open Trivia Database (OpenTDB API) with offline local JSON fallback.
*   **Gamified UX:** Features a ticking timer (30 seconds per question), real-time progress tracking, and instant correctness feedback.
*   **Responsive UI:** Optimized layout for all viewports from mobile to desktop.
*   **PWA Ready:** Implements a Service Worker for performance caching and basic offline capabilities.

---

### 2. 📚 Smart Study Planner
**Folder:** [`/Smart Study Planner`](./Smart%20Study%20Planner)

A productivity dashboard designed for students to organize tasks, manage schedules, and track studying statistics.

*   **CRUD Task Management:** Add, edit, delete, and filter academic tasks by subject, priority, or completion status.
*   **Multiple Layout Views:** Switch easily between the Tasks view, a deadline Calendar view, and a Statistics dashboard.
*   **Smart Reminders:** Built-in alerts for upcoming deadlines and overdue tasks.
*   **Visual Analytics:** Performance metrics and completion progress visualization.

---

## 📁 Repository Structure

```text
AICTE-Frontend/
├── Movie-Review-Platform/                         # Main Project
│   ├── index.html                   # Entry point
│   ├── style.css                    # Professional dark/light stylesheets
│   ├── script.js                    # Movie fetch & review logic
│   └── docs/                        # User guides
│
├── Online Quiz Application/          # Optional Project 1
│   ├── index.html                   # Quiz main layout
│   ├── styles.css                   # Dynamic animations and layout
│   ├── script.js                    # API fetch and scoring rules
│   ├── questions.json               # Local backup question set
│   └── sw.js                        # Offline capability service worker
│
├── Smart Study Planner/             # Optional Project 2
│   ├── index.html                   # Planner dashboard
│   ├── styles.css                   # Responsive CSS grid layouts
│   └── script.js                    # Task & calendar state logic
│
└── Screens/                         # Project screenshots and assets
```

---

## 🚀 How to Run Locally

Since these are pure frontend projects, you can run them directly in your browser without any compilation step:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ARUN-L-KUMAR/AICTE-Frontend.git
    cd AICTE-Frontend
    ```
2.  **Run any Project:**
    *   **Directly:** Open the `index.html` file of the desired project folder (e.g., `./Movie-Review-Platform/index.html`) in your browser.
    *   **Via Local Server (Recommended):** Use a server utility to serve the files (this ensures APIs and service workers behave correctly):
        *   **Python:** `python -m http.server 8000` (Visit `http://localhost:8000/Movie-Review-Platform`)
        *   **Node.js / npm:** `npx serve .`

---

## 📄 License
This project is open-source under the MIT License.
