# 📝 Blogify — Full Stack Blogging Application

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v24+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Templating-B4CA65?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

A modern, full-stack blogging platform where users can sign up, write blogs with cover images, and engage through comments — all secured with JWT-based cookie authentication.

</div>

---

## ✨ Features

- 🔐 **User Authentication** — Secure Sign Up & Sign In with JWT tokens stored in HTTP cookies
- 🏠 **Home Feed** — Browse all blogs sorted by latest, with author info
- ✍️ **Create Blogs** — Write and publish blogs with a title, body, and cover image upload
- 🖼️ **Image Uploads** — Cover images handled via Multer and served statically
- 💬 **Comments** — Authenticated users can comment on any blog post
- 🚪 **Sign Out** — Cookie-cleared logout for clean session handling
- 🛡️ **Protected Routes** — Middleware guards routes that require login
- 🎨 **EJS Templating** — Dynamic server-side rendered views with partials

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js (v24+) |
| **Framework** | Express.js 5.x |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Templating** | EJS (Embedded JavaScript) |
| **Authentication** | JWT (jsonwebtoken) + cookie-parser |
| **File Uploads** | Multer |
| **Environment** | dotenv |
| **Dev Tool** | Nodemon |

---

## 📁 Project Structure

```
29_blogging application/
│
├── 📄 app.js                    # Entry point — Express app setup, DB connection, routes
│
├── 📁 models/                   # Mongoose data models
│   ├── user.js                  # User schema (fullName, email, password + matchPassword)
│   ├── blog.js                  # Blog schema (title, body, coverImageURL, createdBy)
│   └── comment.js               # Comment schema (content, blogId, createdBy)
│
├── 📁 routes/                   # Express route handlers
│   ├── user.js                  # /user — signup, signin, signout
│   └── blog.js                  # /blog — create blog, view blog, add comment
│
├── 📁 middlewares/
│   └── authention.js            # cookieAuthentication & requireAuth middleware
│
├── 📁 services/
│   └── auth.js                  # generateToken & verifyToken (JWT helpers)
│
├── 📁 views/                    # EJS templates
│   ├── home.ejs                 # Home feed — all blogs listed
│   ├── blog.ejs                 # Single blog view with comments
│   ├── addBlog.ejs              # Create new blog form
│   ├── signin.ejs               # Login page
│   ├── signup.ejs               # Registration page
│   └── partials/                # Reusable EJS partials (nav, etc.)
│
├── 📁 public/                   # Static assets served by Express
│   ├── images/                  # Static images
│   └── uploads/                 # Blog cover images uploaded by users
│
├── 📄 .env                      # Environment variables (not committed to Git)
├── 📄 package.json
└── 📄 package-lock.json
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account **or** [MongoDB Community](https://www.mongodb.com/try/download/community) installed locally

---

### 🔧 Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/blogging-application.git
cd blogging-application
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3400
JWT_SECRET_KEY=your_super_secret_key
```

> 💡 For local MongoDB, use: `MONGO_URI=mongodb://localhost:27017/blogging_app`  
> 💡 For MongoDB Atlas, use your Atlas connection string from the Atlas dashboard.

---

### ▶️ Running the App

**Development mode** (with auto-restart via Nodemon):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Then open your browser and visit:
```
http://localhost:3400
```

---

---

<div align="center">

⭐ If you found this project helpful, give it a star!

</div>
