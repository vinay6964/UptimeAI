# UptimeAI Full Stack Engineer Assignment

## 🚀 Project Overview

This project is a **Full Stack coding assignment** designed to replicate key features of the GitHub user profile page. It allows users to search for any GitHub username or organization and view detailed profile information, top repositories, and real-time contribution activity in a polished, responsive interface.

Unlike standard client-side applications, this project implements a **Backend-for-Frontend (BFF)** architecture. A **Node.js/TypeScript backend** acts as a secure proxy to the GitHub GraphQL API, ensuring API tokens are never exposed to the client, while the **Angular frontend** utilizes **Tailwind CSS** to match GitHub's native design language.

---

## 🔗 Live Demo
**Frontend Application:** [https://uptime-ai-delta.vercel.app](https://uptime-ai-delta.vercel.app)

**Backend API:** `https://uptimeai-iv9b.onrender.com`

> **Note:** The backend is hosted on a Render Free Instance. Please allow **30-60 seconds** for the first request to process while the server "wakes up" from inactivity.

---

## ✨ Features

### Core Implementation
- **Real-Time Profile Information**: Fetches live data via the GitHub API to display the user avatar, bio, location, website, Twitter handle, and follower counts.
- **Top Repositories**: Dynamically fetches and displays the top 6 repositories sorted by stars, complete with accurate language colors and descriptions.
- **Responsive Design**: A fully mobile-responsive layout that adapts seamlessly to desktop, tablet, and mobile screens.

### 🌟 Advanced Features & Architectural Highlights
This project includes several advanced implementations beyond the basic requirements:

1.  **Live GitHub GraphQL Integration (No Mock Data)**:
    - Instead of using static mock data for the complex visualizations, this project integrates the **GitHub GraphQL API**.
    - **Contribution Heatmap**: The familiar green commit grid is generated using **real contribution data** fetched live from GitHub.
    - **Repository Stats**: Star counts, fork counts, and language data are all real-time.

2.  **Organization Support**:
    - The system intelligently detects if a search term is a **User** or an **Organization**.
    - If a user profile is not found, the system automatically attempts to fetch organization data, adjusting the UI to show member counts and organization-specific details.

3.  **Activity Overview**:
    - Aggregates and calculates statistics for **Total Commits, Issues, and Pull Requests** over the last year based on the live API response.

4.  **Secure Proxy Server (BFF Pattern)**:
    - Implemented a Node.js Express server to handle API requests. This ensures strict security by keeping the GitHub Personal Access Token (PAT) on the server side, rather than exposing it in the frontend code.

5.  **Mock Achievements**:
    - *Note:* Since the public GitHub API does not expose user "Achievements" (e.g., Pull Shark, YOLO), this specific section uses mock data to complete the visual cloning of the UI.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Angular 17+ (Standalone Components)
- **Styling**: Tailwind CSS
- **State Management**: RxJS (Services & Observables)
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **API**: Express.js
- **Data Source**: GitHub GraphQL API (via `graphql-request`)
- **Deployment**: Render

---

## 🚀 Getting Started

To run this project locally, you must set up both the backend and the frontend.

### Prerequisites
- Node.js (v18 or higher recommended)
- Angular CLI
- A GitHub Personal Access Token (for the backend)

### 1. Clone the Repository
```bash
git clone https://github.com/vinay6964/UptimeAI.git
cd UptimeAI
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your GitHub Token:
```env
GITHUB_TOKEN=your_github_personal_access_token
PORT=5001
```

Start the backend server:
```bash
npm start
```
The backend will run on `http://localhost:5001`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd ../frontend
npm install
```

Start the Angular development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/` to view the application.

---

## 📂 Project Structure

```
.
├── backend/                 # Node.js/Express Backend
│   ├── src/
│   │   ├── services/        # GitHub GraphQL API logic
│   │   ├── controllers/     # Request handlers
│   │   └── routes/          # API endpoints
│
└── frontend/                # Angular Frontend
    ├── src/app/
    │   ├── core/            # Services (GithubService)
    │   ├── features/        # Feature modules (Profile, Repo List, Graphs)
    │   └── shared/          # Shared components (Header, UI elements)
    └── styles.scss          # Global styles & Tailwind imports
```

---

## 📝 API Endpoints

### `GET /api/user/:username`
Fetches combined data for a user or organization, including:
- Profile details (Avatar, Bio, etc.)
- Top 6 starred repositories
- Contribution calendar (Heatmap data)
- Contribution stats (Total commits/PRs)

---

Developed by Vinay Gupta.
