# 🚀 PortfolioHub

**A production-grade full-stack developer portfolio** — built with a decoupled React + Django architecture, cloud media storage, and automated email delivery.

<p align="left">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Django-REST-092E20?logo=django&logoColor=white" alt="Django"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel%20%2B%20Render-black" alt="Deployed"/>
</p>

🔗 **Live App:** [portfoliohub-basil.vercel.app](https://portfoliohub-basil.vercel.app) &nbsp;|&nbsp; **API:** [portfoliohub-backend-mjr8.onrender.com](https://portfoliohub-backend-mjr8.onrender.com)

---

## 💡 What This Demonstrates

- Designing and consuming a **RESTful API** from scratch
- Managing **relational data** (PostgreSQL via Neon) instead of static content
- Integrating **third-party cloud services** — Cloudinary (media) and Brevo (email)
- Shipping to **production** across two independently deployed services
- Content updates (projects, experience, education) happen via Django admin — not code changes

---

## 🏗️ Architecture

```
React + TypeScript + Vite
          │  REST API (JSON)
          ▼
Django + Django REST Framework
          │
     ┌────┼──────────────┐
     ▼    ▼              ▼
 PostgreSQL          Cloudinary
   (Neon)            Media & Files
          │
          ▼
        Brevo (Contact Email)
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Python, Django, Django REST Framework, Gunicorn |
| **Database** | PostgreSQL (Neon) |
| **Cloud Services** | Cloudinary, Brevo |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## ✨ Key Features

- 📱 Fully responsive, animated portfolio UI
- 🔌 Dynamic content served entirely through a REST API
- 🖼️ Cloud-based media and resume management
- 📩 Server-side contact form email delivery
- 🛡️ Django admin panel for content management — no redeploys needed

---

## 🧠 Key Engineering Decisions

**Separated frontend and backend**
React handles presentation; Django REST Framework handles the API — fully decoupled from Django's templating system.

**Cloud-based media storage**
Resumes and profile images are stored in Cloudinary rather than the server's local filesystem, avoiding data loss on redeploys.

**Server-side email delivery**
Contact form submissions never expose email credentials to the browser — Django handles delivery via Brevo server-side.

---

## 👤 Author

**Basil K Paul**
[GitHub](https://github.com/n8novaa) · [LinkedIn](https://linkedin.com/in/basil-k-paul-6599a0249)