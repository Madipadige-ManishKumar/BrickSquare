# Real Estate MERN Project 🏡

A **full-stack web application** for buying, selling, and renting houses. Users can create listings, browse properties, and interact seamlessly while enjoying secure authentication, state management, and dynamic property recommendations using machine learning.

---

## 🌟 Features

- **User Authentication**:  
  - Secure login/signup using **OAuth** and **JWT**  
  - Only authorized users can manage their listings  

- **Listings Management**:  
  - Users can **create, view, edit, and delete** property listings  
  - Filter and search properties dynamically  

- **Machine Learning Integration**:  
  - Python-based algorithms highlight **best-seller properties** based on user preferences and property popularity  

- **State Management**:  
  - **Redux** ensures smooth and predictable client-side state management  

- **Testing**:  
  - Application tested with **Jest** for both backend and frontend components  

- **Responsive UI**:  
  - Dynamic and user-friendly interface built with React.js  

---

## 🖼 Screenshots / Demo

<!-- Add screenshots of the app here for visuals -->
<!-- Example: Home Page -->
## Home page
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e71c46e5-826e-4c5a-bcf8-d248d05ccc29" />

## Profile page
<!-- Example: Listing Creation -->
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/2a466e54-0896-4e57-a2d4-41e6386ed752" />

## Listing Page
<!-- Example: Profile / User Dashboard -->
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/70c0155a-fc70-46b2-9b5a-e2f79f39db36" />


---

## 🛠 Tech Stack

- **Frontend**: React.js, Redux, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: OAuth, JWT  
- **Testing**: Jest  
- **Machine Learning**: Python for best-seller property selection  

---

## 🚀 Installation & Setup

1. **Clone the repository**  
```bash
git clone https://github.com/your-username/Real-estate-MERN-project.git
cd Real-estate-MERN-project
````
2 ** Backend Set up**
```bash
cd api
npm install
cp env.example .env   # Add your environment variables
npm run dev
```
3 ** Frontend Set up**
```bash
cd client
npm install
npm run dev
```

## Project Structure
```bash
Real-estate-MERN-project/
├── Client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── redux/
├── api/                # Backend server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utilis/
├── env.example         # Sample environment variables
├── package.json
└── README.md
```
