# Real Estate MERN & ML Application 🏡🤖

A feature-rich, full-stack **MERN (MongoDB, Express, React, Node.js)** application integrated with a **Python/Flask Machine Learning** microservice for house price prediction and property management. Fully containerized with **Docker** and **Docker Compose** for seamless multi-container orchestration.

---

## 🌟 Key Features

- **🔐 Secure User Authentication**
  - OAuth (Google Sign-In) & JWT authentication.
  - Protected endpoints with HTTP-only cookies and role/user-based authorization.

- **🏡 Property & Listings Management (Full CRUD)**
  - Create, view, edit, and delete real estate property listings.
  - Upload images and property details (area, bedrooms, bathrooms, parking, furnishing status, etc.).
  - Advanced dynamic search and filtering options (by price, offer, rent/sale, amenities).

- **🤖 Machine Learning Price Prediction Microservice**
  - Python Flask API (`ML-api`) powered by a trained `scikit-learn` regression model.
  - Predicts estimated property prices dynamically based on structural features (area, bedrooms, bathrooms, stories, parking, amenities, and furnishing status).

- **🐳 Dockerized Architecture**
  - Fully containerized microservices architecture with **Docker** & **Docker Compose**.
  - One-command setup running Express Backend, React Frontend (Nginx), Flask ML service, and MongoDB database.

- **⚡ Modern Frontend & State Management**
  - Responsive, high-performance UI built with **React**, **Vite**, and **Redux Toolkit**.

- **🧪 Testing & Quality Assurance**
  - Frontend and Backend automated unit & integration testing configured with **Vitest** and **Jest**.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, Vite, Nginx |
| **Backend API** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ORM |
| **ML Microservice** | Python, Flask, Pandas, Scikit-Learn, Joblib |
| **Authentication** | JWT, OAuth (Google / Firebase) |
| **Containerization** | Docker, Docker Compose |
| **Testing** | Vitest, Jest |

---

## 🖼 Screenshots & Demo

### 🏠 Home Page
<img width="1366" alt="Home Page" src="https://github.com/user-attachments/assets/e71c46e5-826e-4c5a-bcf8-d248d05ccc29" />

### 👤 Profile Page
<img width="1366" alt="Profile Page" src="https://github.com/user-attachments/assets/2a466e54-0896-4e57-a2d4-41e6386ed752" />

### 📋 Property Listing Page
<img width="1366" alt="Listing Page" src="https://github.com/user-attachments/assets/70c0155a-fc70-46b2-9b5a-e2f79f39db36" />

---

## 📂 Project Structure

```text
Real-estate-MERN-project/
├── Client/                 # React frontend (Vite + Redux + Nginx Dockerfile)
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/          # Application Views
│   │   └── redux/          # Redux State Management
│   ├── Dockerfile
│   └── nginx.conf
├── api/                    # Node.js + Express Backend API
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express API routes
│   └── test/               # API tests
├── ML-api/                 # Python Flask ML Service
│   ├── app.py              # Flask API for house price prediction (/predict)
│   ├── train_model.py      # Model training script
│   ├── Housing.csv         # Real estate dataset
│   ├── price_model.pkl     # Pre-trained ML model pipeline
│   └── Dockerfile
├── docker-compose.yml      # Docker Compose orchestration
├── Dockerfile              # Backend API Dockerfile
├── env.example             # Sample environment variables
├── package.json            # Root Node.js dependencies & test scripts
└── README.md
```

---

## 🚀 Getting Started

You can run the project either using **Docker Compose** (recommended) or set up services **locally**.

### Option 1: Quickstart with Docker Compose 🐳 (Recommended)

Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Madipadige-ManishKumar/Real-estate-MERN-project.git
   cd Real-estate-MERN-project
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory (or copy from `env.example`):
   ```bash
   cp env.example .env
   ```
   Set your JWT Secret and MongoDB connection string if necessary:
   ```env
   MONGO_DB_URL="mongodb://mongo:27017/real-estate"
   JWT_SECRET="your_jwt_secret_key"
   ```

3. **Build and Run all containers:**
   ```bash
   docker compose up --build
   ```

4. **Access Services:**
   - **Frontend App**: `http://localhost:80` (or `http://localhost`)
   - **Backend API**: `http://localhost:5000`
   - **ML Prediction Service**: `http://localhost:3000`
   - **MongoDB Database**: `mongodb://localhost:27017`

---

### Option 2: Local Development Setup 💻

#### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB running locally or MongoDB Atlas connection URI

#### 1. Backend Setup (`api`)
```bash
# Navigate to project root
npm install

# Create environment file
cp env.example .env
# Fill in MONGO_DB_URL and JWT_SECRET in .env

# Start backend server in dev mode
npm run dev
```

#### 2. ML Prediction Microservice (`ML-api`)
```bash
cd ML-api

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server (runs on port 3000)
python app.py
```

#### 3. Frontend Setup (`Client`)
```bash
cd Client

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```

---

## 🧪 Running Tests

To execute tests across the application:

```bash
# Run backend tests with Vitest
npm run test
```

---

## 🤖 ML API Usage Example

Send a `POST` request to `http://localhost:3000/predict` with JSON property features:

```json
{
  "area": 7420,
  "bedrooms": 4,
  "bathrooms": 2,
  "stories": 3,
  "parking": 2,
  "mainroad": "yes",
  "guestroom": "no",
  "basement": "no",
  "hotwaterheating": "no",
  "airconditioning": "yes",
  "furnishingstatus": "furnished"
}
```

**Response:**
```json
{
  "predictedPrice": 13300000.0
}
```

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
