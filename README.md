# ⚡ Enterprise Developer API Portal

A production-grade **API Management platform** built with **WSO2 API Manager**, **Node.js/Express**, and **React**. This project demonstrates how enterprise companies expose, secure, and monetize their internal APIs through a professional Developer Portal.

---

## 🏗️ Architecture

```
External Developer → WSO2 API Gateway → Express Backend APIs
                ↕                              ↕
        Developer Portal              Weather & Stock Services
        (Subscribe, Get Tokens)        (Business Logic Layer)
```

| Layer | Tech | Purpose |
|-------|------|---------|
| **Frontend** | React + Vite | Professional dashboard to visualize API data |
| **Backend** | Node.js + Express | RESTful API server (Weather & Stock data) |
| **Gateway** | WSO2 API Manager | OAuth2 security, rate limiting, API publishing |

---

## 📂 Project Structure

```
developer_api_portal/
├── backend/                    # Express API Server
│   ├── src/
│   │   ├── config/             # Centralized environment config
│   │   ├── controllers/        # HTTP request/response handlers
│   │   ├── middleware/         # Error handler, request logger
│   │   ├── routes/            # Endpoint definitions
│   │   └── services/          # Business logic (swappable for real APIs)
│   ├── server.js              # Entry point
│   ├── .env                   # Environment variables
│   └── package.json
│
├── frontend/                  # React Dashboard
│   ├── src/
│   │   ├── components/        # Header, Dashboard, WeatherCard, StockCard
│   │   ├── services/          # Centralized API calls
│   │   └── styles/            # Global design system (dark theme)
│   ├── index.html
│   ├── vite.config.js         # Dev server + API proxy config
│   └── package.json
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/deshanFdo/wso2product.git
cd wso2product/developer_api_portal

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running Locally

Open **two terminals**:

```bash
# Terminal 1 — Backend (port 3000)
cd developer_api_portal/backend
npm start
```

```bash
# Terminal 2 — Frontend (port 5173)
cd developer_api_portal/frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api/v1`.

### Weather API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/weather?city=London` | Weather data for a specific city |
| `GET` | `/api/v1/weather/all` | Weather data for all cities |
| `GET` | `/api/v1/weather/cities` | List of supported city names |

### Stock Alert API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/stocks?symbol=AAPL` | Stock data for a specific ticker |
| `GET` | `/api/v1/stocks/all` | Stock data for all tickers |
| `GET` | `/api/v1/stocks/symbols` | List of supported ticker symbols |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` | Backend health check + uptime |

---

## 🛡️ WSO2 Integration (Phases 3-6)

This project is designed to integrate with **WSO2 API Manager** to add:

- **OAuth2 Authentication** — Secure API access with tokens
- **Rate Limiting** — Bronze (5 req/min) and Gold (50 req/min) tiers
- **Developer Portal** — Built-in UI for external developers to discover, subscribe, and test APIs
- **API Analytics** — Monitor who is calling which APIs and how often

> WSO2 API Manager will sit between the frontend and backend as a gateway, enforcing security and rate limits on every request.

---

## 🧑‍💻 Tech Stack

| Category | Technology |
|----------|-----------|
| Backend | Node.js, Express.js, dotenv |
| Frontend | React 19, Vite 7, Vanilla CSS |
| Gateway (upcoming) | WSO2 API Manager 4.x |
| Version Control | Git + GitHub |

---

## 📋 Roadmap

- [x] **Phase 1** — Architecture & planning
- [x] **Phase 2** — Backend microservices + React frontend dashboard
- [ ] **Phase 3** — WSO2 API Manager setup
- [ ] **Phase 4** — API publishing & rate limit configuration
- [ ] **Phase 5** — Developer portal experience
- [ ] **Phase 6** — Security testing & validation

---

## 📄 License

This project is for educational and portfolio purposes.

---

> Built with ⚡ by [deshanFdo](https://github.com/deshanFdo)
