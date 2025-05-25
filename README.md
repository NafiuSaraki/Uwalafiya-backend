# UwaLafiya

**UwaLafiya** is a full-stack maternal and infant health app that provides weekly pregnancy tips in English and Hausa. It is designed to assist expectant mothers with trusted health guidance sourced from WHO and NHS.

---

## Features

### Frontend (React.js)
- User Registration and Login
- Pregnancy Week Selection
- Weekly Pregnancy Tips (Hausa & English)
- Health Advice based on week
- Contact Form for sending messages
- Mobile-Responsive and User-Friendly Interface

### Backend (Node.js + Express.js)
- REST API for Register/Login/Contact Form
- JWT Authentication
- Nodemailer for email sending
- Serves frontend in production

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Express.js, Node.js
- **Auth:** JSON Web Token (JWT)
- **Email:** Nodemailer (Gmail SMTP)
- **Others:** dotenv, CORS

---

## Folder Structure

```
uwalafiya-backend/
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server.js             # Express server
├── .env                  # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/uwalafiya-backend.git
cd uwalafiya-backend
```

### Backend Setup

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-secret-key
```

### Frontend Setup

```bash
cd client
npm install
cd ..
```

---

## Run the App Locally

```bash
npm start
```

This will start the Express backend and serve the built React frontend.

---

## Deployment (Heroku or others)

The project is structured for full-stack deployment. In `package.json`, the following script is used:

```json
"scripts": {
  "start": "node server.js",
  "heroku-postbuild": "cd client && npm install && npm run build"
}
```

This allows React to build during deployment.

---

## .gitignore

```gitignore
# Backend
node_modules/
.env

# Frontend
client/node_modules/
client/build/
```

---

## Contact

Created by **Nafiu Baba Saraki**  
For support, reach out through the app's contact form or email.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

**UwaLafiya** – Trusted Care for Mother and Baby.