# WorkSphere - Responsive Full-Stack Job Portal

WorkSphere is a modern, full-stack job portal application designed to connect job seekers and companies. It features a responsive React frontend, a robust Node.js/Express backend, and MongoDB for data storage. The platform is live and available for users to explore.

## 🌐 Live Demo

[https://jobsphere-63tv.onrender.com/](https://jobsphere-63tv.onrender.com/)

---

## 🛠 Tech Stack

**Frontend**
- **React** (JavaScript)
- **TailwindCSS** (Utility-first styling)
- **Redux Toolkit** (Global state management)
- **react-hook-form** (Form validation)
- **react-router-dom** (Routing)
- **@headlessui/react** (Accessible UI components: modals, menus, dropdowns)

**Backend**
- **Node.js** & **Express.js** (REST API)
- **MongoDB** (Primary database)
- **Mongoose** (Schema & validation)
- **Cloudinary** (Image upload & storage)
- **JWT** (Authentication & authorization)
- **Crypto** (Password encryption)
- **Morgan** (API request logging)
- **Nodemon** (Development server auto-reload)

---

## 🚀 Key Features

### 🖥️ Frontend
- **Authentication & Authorization:** Secure registration/login via modal dialogs, JWT-based session management.
- **Responsive UI:** Mobile-first design, collapsible hamburger menu, adaptive layouts.
- **Job Search & Filtering:** Search jobs by title, location, type, and experience; instant filtering and debounced search.
- **Job Details:** Rich job cards with company info, salary, requirements, and similar jobs suggestions.
- **Company Directory:** Browse registered companies, view job counts, and detailed company profiles.
- **Profile Management:** Edit/update user and company profiles, including logo/image uploads.
- **Job Posting:** Companies can post jobs with validation and custom job types.
- **Newsletter Subscription:** Users can subscribe to company updates via the footer.
- **Global State:** Redux for user/session management and app-wide state.
- **Navigation:** Protected routes, seamless page transitions, and bug-free navigation using React Router hooks.

### 🗄️ Backend
- **RESTful APIs:** CRUD for jobs, users, and companies.
- **Authentication:** JWT tokens for secure endpoints.
- **Password Security:** Salted and hashed passwords using crypto.
- **Data Validation:** Mongoose schemas for robust data integrity.
- **Error Handling:** Centralized middleware for clean error responses.
- **Logging:** Morgan for request tracking and debugging.
- **Image Uploads:** Cloudinary integration for company logos and profile images.

---

## 📄 Project Structure

```
projectNotes.txt
README.md
app-src/
  ├── .env
  ├── index.html
  ├── package.json
  ├── src/
  │   ├── App.jsx
  │   ├── main.jsx
  │   ├── components/
  │   ├── pages/
  │   ├── redux/
  │   └── utils/
server/
  ├── .env
  ├── package.json
  ├── src/
      ├── controllers/
      ├── middleware/
      ├── models/
      ├── router/
      └── utils/
```

---

## 📝 Usage

### Local Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/find-me-job.git
   cd find-me-job
   ```

2. **Frontend:**
   ```sh
   cd app-src
   npm install
   npm run dev
   ```

3. **Backend:**
   ```sh
   cd server
   npm install
   npm run dev
   ```

4. **Environment Variables:**
   - Configure `.env` files in both `app-src` and `server` directories for API keys, database URIs, etc.

---

## 👤 Demo Credentials

**Company:**
- `testcompany.abc@gmail.com / 12345678`
- `testcompany.123@gmail.com / 12345678`

**User:**
- `testuser.123@gmail.com / 12345678`

---

## 📚 Documentation

- Project notes and architecture details are available in [`projectNotes.txt`](projectNotes.txt).
