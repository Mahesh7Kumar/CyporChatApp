<p align="center">
  <a href="https://your-live-link.com">
    <img src="https://YOUR_BANNER_IMAGE_URL_HERE" alt="CyporChatApp Banner" width="100%" />
  </a>
</p>

<h1 align="center">CyporChatApp 🚀</h1>

<p align="center">
  <strong>Secure Real-Time Chat Application Built with MERN Stack + Socket.IO</strong><br />
  🔗 <a href="https://cyporchatapp.netlify.app/">Live Demo</a>
</p>

---

## 📖 About the Project

**CyporChatApp** is a real-time full-stack chat app that supports:
- User authentication
- 1:1 and group messaging
- File and emoji sharing
- Typing indicators
- Responsive Material UI layout

---

## ⚙️ Tech Stack

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" title="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" title="JavaScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" title="Node.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" title="Express.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" title="MongoDB"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" width="40" title="Socket.IO"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" width="40" title="Material UI"/>
</div>

---

## 🛠 Tools Used

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&logoColor=white"/>
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white"/>
</div>

---

## 📸 Project Screenshots

<p align="center">
  <img src="https://YOUR_IMAGE_URL_HERE1" width="45%" alt="Login Page"/>
  <img src="https://YOUR_IMAGE_URL_HERE2" width="45%" alt="Chat List"/>
</p>
<p align="center">
  <img src="https://YOUR_IMAGE_URL_HERE3" width="45%" alt="Chat Interface"/>
  <img src="https://YOUR_IMAGE_URL_HERE4" width="45%" alt="Group Chat"/>
</p>
<p align="center">
  <img src="https://YOUR_IMAGE_URL_HERE5" width="60%" alt="Profile or Settings"/>
</p>

---

## 📦 Local Setup Instructions

### 1. Clone the Repository

```
bash
git clone https://github.com/Mahesh7Kumar/CyporChatApp.git
cd CyporChatApp
```
---
## Backend Setup (/server)

```
bash
cd server
npm install
npm run dev
```

Create a ``` .env``` file inside ```server/ ``` and add:

```
env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000
```

## Frontend Setup (/client)

```
bash
cd ../client
npm install
npm start
```

Create a `.env` file inside ```client/ ``` and add:

```
env
REACT_APP_API_URL=http://localhost:5000
```
---

## 🚀 Deployment Guide

### 🔧 Deploy Backend (Render)

1. Push /server code to GitHub.

2. Visit <a href="https://render.com">https://render.com</a> → New → Web Service → Connect your repo.

3. Set:
       - Build Command: ```npm install```
       - Start Command: ```npm run dev```

4. Add Environment Variables:

       MONGO_URI
       JWT_SECRET
       PORT=5000
       Deploy and note the backend URL (e.g., https://your-backend-url.onrender.com).
6. Deploy and note the backend URL (e.g.,``` https://your-backend-url.onrender.com```).

---

##  🌐 Deploy Frontend (e.g., Vercel / Netlify)

1. Push ```/client``` code to GitHub.

2. Go to <a href="https://vercel.com">https://vercel.com</a> or <a href="https://netlify.com.">https://netlify.com.</a>

3. Select `/client` folder and configure:
                1.Build Command: ``npm run build``
                2.Output Directory: ``build``
   
5. Add environment variable:
   ```
   bash
    REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
6. Click Deploy and copy your live frontend URL.
---

## 🔗 Connecting Frontend to Backend
In `/client/.env`:

```
env
  REACT_APP_API_URL=https://your-backend-url.onrender.com
```
Then in React code:

```
js
Copy code
const BASE_URL = process.env.REACT_APP_API_URL;
axios.get(`${BASE_URL}/api/messages`);
```
✅ Tips:

1. Ensure backend has CORS enabled

2. Never commit `.env` files

3. Restart frontend after editing `.env`

---
## ✅ Features

-🔐 JWT Auth (Sign Up / Login)

-💬 Real-Time Messaging via Socket.IO

-😄 Emoji & File Sharing

-👤 1:1 and Group Chat

-📱 Responsive Design (Mobile + Web)

-✍️ Typing Indicator

---

## 🧩 Future Enhancements
-📞 Audio/Video Calls

-🌗 Dark Mode

-🔔 Push Notifications

-📝 Edit/Delete Messages

-🐳 Docker Deployment

----

## 📘 Contribution Guide
Want to contribute? Follow the steps below:

1. 🍴 Fork the repository

2. 🧑‍💻 Clone your fork
```
bash
Copy code
git clone https://github.com/YOUR-USERNAME/CyporChatApp.git
```

3. 🛠️ Create a new branch
```
bash
Copy code
git checkout -b feature/your-feature-name
```

4. ✅ Commit your code
```
bash
Copy code
git commit -m "Add your message"
```

5.🔄 Push to GitHub
```
bash
git push origin feature/your-feature-name
```

6.🧵 Open a Pull Request and explain what you did
      We welcome contributions that improve UI/UX, performance, features, or docs! 🎉
----

## 👨‍💻 Author
Mahesh Kumar
📧 mr.maheshkumar.i07@gmail.com
🔗 GitHub – Mahesh7Kumar
---


