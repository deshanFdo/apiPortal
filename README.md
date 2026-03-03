# Enterprise Developer API Portal

A production-grade **API Management platform** built with **WSO2 API Manager**, **WSO2 Asgardeo**, **Node.js/Express**, and **React**. Demonstrates how enterprises expose, secure, and manage APIs through WSO2's product ecosystem.

## Key Features

- **API Gateway** — All API traffic routed through WSO2 API Manager with OAuth2, rate limiting, and analytics
- **Identity Management** — User authentication via WSO2 Asgardeo (OpenID Connect / OAuth2)
- **Developer Portal** — Built-in WSO2 portal for API discovery, subscription, and token generation
- **Live Data** — Real-time Weather (Open-Meteo), Stock (Yahoo Finance), and Crypto (CoinGecko) APIs
- **Containerized** — One-command Docker Compose setup for the entire WSO2 + backend stack
- **OpenAPI 3.0** — All APIs have importable OpenAPI specs for WSO2 Publisher

---

## Architecture

```
                        +----------------------+
                        |   WSO2 Asgardeo      |
                        |  (Identity Provider)  |
                        +----------+-----------+
                                   | OAuth2 / OpenID Connect
                                   v
  React Frontend --> WSO2 API Gateway --> Express Backend APIs
  (Dashboard)        (Rate Limiting,       (Weather, Stock, Crypto)
                      JWT Validation,
                      API Analytics)
```

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite | Dashboard to visualize API data |
| **Identity** | WSO2 Asgardeo | OAuth2 / OpenID Connect authentication |
| **Gateway** | WSO2 API Manager 4.3 | JWT validation, rate limiting, API publishing, developer portal |
| **Backend** | Node.js + Express | RESTful APIs (Weather, Stock, Crypto) |

---

## WSO2 Products Used

### WSO2 API Manager
- **API Gateway** - Routes all API traffic, enforces OAuth2 security and rate limits
- **Publisher Portal** - Publish and manage API lifecycle (`https://localhost:9443/publisher`)
- **Developer Portal** - External developers discover, subscribe, and test APIs (`https://localhost:9443/devportal`)
- **JWT Token Validation** - Backend validates X-JWT-Assertion headers from the gateway
- **Throttling Tiers** - Bronze (5 req/min), Silver (20 req/min), Gold (50 req/min)
- **OpenAPI Definitions** - All 3 APIs have OpenAPI 3.0 specs for import into WSO2 Publisher

### WSO2 Asgardeo (Identity as a Service)
- **Single Sign-On** - Users authenticate via Asgardeo's hosted login page
- **OAuth2 + OIDC** - Frontend uses `@asgardeo/auth-react` SDK for token management
- **User Management** - Manage users, roles, and permissions in Asgardeo console

---

## Project Structure

```
developer_api_portal/
├── backend/                          # Express API Server
│   ├── src/
│   │   ├── config/                   # Environment config (incl. WSO2 settings)
│   │   ├── controllers/              # HTTP request/response handlers
│   │   ├── middleware/
│   │   │   ├── errorHandler.js       # Global error handler
│   │   │   ├── requestLogger.js      # Request logging
│   │   │   └── wso2JwtValidator.js   # WSO2 JWT token validation
│   │   ├── routes/                   # Weather, Stock, Crypto routes
│   │   └── services/                 # Business logic + external API calls
│   ├── server.js                     # Entry point
│   ├── Dockerfile                    # Container config for Docker Compose
│   ├── .env.example                  # Environment template
│   └── package.json
│
├── frontend/                         # React Dashboard
│   ├── src/
│   │   ├── config/
│   │   │   └── asgardeo.js           # WSO2 Asgardeo auth config
│   │   ├── components/               # Header, Dashboard, Cards
│   │   ├── services/                 # API client layer
│   │   └── styles/                   # Global styles
│   ├── .env.example                  # Environment template
│   └── package.json
│
└── wso2-gateway/                     # WSO2 API Manager Setup
    ├── docker-compose.yml            # Runs WSO2 APIM + backend
    ├── conf/
    │   └── deployment.toml           # APIM config (CORS, JWT, Gateway)
    └── api-definitions/              # OpenAPI specs for publishing
        ├── weather-api.yaml
        ├── stocks-api.yaml
        └── crypto-api.yaml
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Docker** (for WSO2 API Manager) ([Download](https://www.docker.com/products/docker-desktop/))
- **WSO2 Asgardeo account** (free) - [Sign up](https://asgardeo.io)

### 1. Clone and Install

```bash
git clone https://github.com/deshanFdo/apiPortal.git
cd apiPortal/developer_api_portal

# Backend
cd backend
cp .env.example .env
npm install

# Frontend
cd ../frontend
cp .env.example .env
npm install
```

### 2. Configure WSO2 Asgardeo

1. Go to [Asgardeo Console](https://console.asgardeo.io)
2. Create a **Single-Page Application**
3. Set **Authorized Redirect URL** to `http://localhost:5173`
4. Copy the **Client ID** and **Organization Name**
5. Update `frontend/.env`:
   ```
   VITE_ASGARDEO_CLIENT_ID=<your-client-id>
   VITE_ASGARDEO_ORG_NAME=<your-org-name>
   ```

### 3. Run Locally (without WSO2 Gateway)

```bash
# Terminal 1 - Backend (port 3000)
cd developer_api_portal/backend
npm start

# Terminal 2 - Frontend (port 5173)
cd developer_api_portal/frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

### 4. Run with WSO2 API Manager (Docker)

```bash
cd developer_api_portal/wso2-gateway
docker-compose up -d
```

Wait ~90 seconds for WSO2 to start, then:

1. Open **WSO2 Publisher**: `https://localhost:9443/publisher` (admin/admin)
2. Click **Import OpenAPI** and upload the YAML files from `api-definitions/`
3. Set the backend endpoint to `http://backend-api:3000/api/v1`
4. Publish the APIs
5. Open **WSO2 DevPortal**: `https://localhost:9443/devportal`
6. Subscribe to the APIs and generate an access token
7. Update `backend/.env` to enable JWT validation:
   ```
   WSO2_JWT_VALIDATION=true
   ```

---

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Weather API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/weather?city=London` | Weather for a specific city |
| `GET` | `/api/v1/weather/all` | Weather for all 10 cities |
| `GET` | `/api/v1/weather/cities` | List supported city names |

### Stock Alert API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/stocks?symbol=AAPL` | Stock data for a ticker |
| `GET` | `/api/v1/stocks/all` | Stock data for all tickers |
| `GET` | `/api/v1/stocks/symbols` | List supported symbols |

### Cryptocurrency API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/crypto/all` | Prices for BTC, ETH, SOL, ADA, XRP |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health` | Backend health check |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Backend | Node.js, Express.js, Axios |
| Frontend | React 19, Vite 7, @asgardeo/auth-react |
| API Gateway | WSO2 API Manager 4.3 |
| Identity | WSO2 Asgardeo (OAuth2 / OIDC) |
| Containerization | Docker, Docker Compose |
| Version Control | Git + GitHub |

---

## Screenshots

> Run the project locally and visit `http://localhost:5173` to see the dashboard.
> WSO2 Publisher portal is at `https://localhost:9443/publisher` and DevPortal at `https://localhost:9443/devportal`.

---

## License

This project is for educational and portfolio purposes.

---

> Built by [deshanFdo](https://github.com/deshanFdo)
