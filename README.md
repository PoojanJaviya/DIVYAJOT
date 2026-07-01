# 🌱 DIVYAJOT — Full Stack NGO Website

> **"Empowering Change, Transforming Lives"**

A production-ready, enterprise-grade NGO website built with **React + Node.js + MySQL**.

---

## 🗂️ Project Structure

```
divyajot-foundation/
├── frontend/                   # React 18 + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Navbar, Footer, AdminLayout, Layout
│   │   │   ├── home/           # Hero, StatsBar, Mission, CauseCards, Testimonials, CTABanner
│   │   │   ├── donate/         # DonateWidget (Razorpay + UPI)
│   │   │   ├── volunteer/      # VolunteerForm
│   │   │   ├── gallery/        # GalleryGrid with Lightbox
│   │   │   ├── contact/        # ContactForm
│   │   │   └── ui/             # LoadingSpinner, SectionHeader, StatCard, BackToTop
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Causes.tsx
│   │   │   ├── Activities.tsx
│   │   │   ├── Impact.tsx      # Live charts with Recharts
│   │   │   ├── Volunteer.tsx
│   │   │   ├── Donate.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Transparency.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogDetail.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── admin/          # Dashboard, Donations, Volunteers, Contacts, etc.
│   │   ├── context/            # AuthContext (JWT auth)
│   │   ├── services/           # api.ts, donationService, volunteerService, contactService
│   │   └── utils/              # helpers.ts, constants.ts
│   └── ...config files
│
├── backend/                    # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/        # auth, donation, volunteer, event, gallery, blog, contact, cause, report, admin, newsletter
│   │   ├── routes/             # Separate route file per module
│   │   ├── middleware/         # auth.middleware.ts, validate.middleware.ts
│   │   ├── services/           # email.service.ts (Nodemailer + HTML templates)
│   │   ├── utils/              # jwt.ts, response.ts
│   │   └── config/             # prisma.ts (MySQL singleton)
│   ├── prisma/
│   │   ├── schema.prisma       # Full MySQL schema (18 models)
│   │   └── seed.ts             # Admin user + causes + metrics + partners
│   └── ...config files
│
├── docker-compose.yml          # MySQL + Backend + Frontend
├── .github/workflows/ci-cd.yml # GitHub Actions (build + deploy)
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- MySQL 8.0+ (or Docker)
- npm

### 1. Clone & Install

```bash
git clone https://github.com/your-org/divyajot-foundation.git
cd divyajot-foundation

# Install all dependencies
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure Environment

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env — add DB credentials, Razorpay keys, SMTP, Cloudinary

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env — add Razorpay public key
```

### 3. Database Setup

```bash
# Option A: Local MySQL
mysql -u root -p -e "CREATE DATABASE divyajot_db;"

# Option B: Docker MySQL only
docker-compose up -d mysql

# Run Prisma migrations
cd backend
npx prisma migrate dev --name init

# Seed the database (creates admin user + initial data)
npm run db:seed
```

### 4. Run Development Servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🔑 Admin Access

```
URL:      http://localhost:3000/admin
Email:    admin@divyajotfoundation.org
Password: Admin@2024!
```

> ⚠️ Change these credentials immediately after first login!

---

## 🐳 Docker (Full Stack)

```bash
# Copy and fill environment
cp backend/.env.example backend/.env

# Build and start all services
docker-compose up -d

# Run migrations inside container
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npm run db:seed
```

Services:
- Frontend → http://localhost:3000
- Backend  → http://localhost:5000
- MySQL    → localhost:3306

---

## 🗄️ Database (MySQL via Prisma)

### Models
| Model | Description |
|---|---|
| `User` | Auth users with role-based access |
| `RefreshToken` | JWT refresh token store |
| `Donation` | Razorpay payment records + 80G |
| `Volunteer` | Registration + approval workflow |
| `Event` | Activities and events |
| `Cause` | 8 cause categories |
| `GalleryItem` | Images/videos with Cloudinary |
| `Blog` | Posts with author + SEO |
| `Comment` | Blog comments with moderation |
| `Report` | Annual reports + certificates |
| `ContactMessage` | Queries with status workflow |
| `Testimonial` | Donor/beneficiary testimonials |
| `Partner` | Partner logos |
| `NewsletterSubscriber` | Email subscriptions |
| `ImpactMetric` | Dynamic dashboard numbers |

### Common Commands
```bash
npx prisma studio          # Visual DB browser
npx prisma migrate dev     # Create new migration
npx prisma migrate deploy  # Apply in production
npx prisma db push         # Push schema changes (dev)
npm run db:seed            # Seed initial data
```

---

## 🌐 API Endpoints

### Public
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
GET  /api/causes
GET  /api/events
GET  /api/blogs
GET  /api/blogs/:slug
GET  /api/gallery
GET  /api/reports
POST /api/donations/create-order
POST /api/donations/verify
POST /api/volunteers/register
POST /api/contact
POST /api/newsletter/subscribe
```

### Protected (Admin)
```
GET    /api/admin/stats
GET    /api/donations
GET    /api/volunteers
PATCH  /api/volunteers/:id/approve
PATCH  /api/volunteers/:id/reject
GET    /api/contact
PATCH  /api/contact/:id/status
POST   /api/gallery
DELETE /api/gallery/:id
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id
```

---

## 🚀 Production Deployment

### Frontend → Vercel
```bash
cd frontend
npm install -g vercel
vercel --prod

# Set these env vars in Vercel dashboard:
# VITE_API_URL=https://api.divyajotfoundation.org
# VITE_RAZORPAY_KEY_ID=rzp_live_xxx
```

### Backend → Railway
```bash
# In Railway dashboard:
# 1. Connect GitHub repo
# 2. Set root directory: backend
# 3. Add all .env variables
# 4. Add MySQL database plugin
```

### MySQL → PlanetScale (Recommended)
```bash
npm install -g pscale
pscale auth login
pscale database create divyajot-db --region ap-south
# Update DATABASE_URL in backend .env
npx prisma migrate deploy
```

---

## 🔒 Security

- ✅ JWT access + refresh token rotation
- ✅ Bcrypt password hashing (rounds: 12)
- ✅ Role-based access control (SUPER_ADMIN / ADMIN / EDITOR / VOLUNTEER_COORDINATOR)
- ✅ Helmet.js security headers
- ✅ Rate limiting (global: 200/15min, auth: 20/15min, contact: 5/hr)
- ✅ Zod input validation
- ✅ Razorpay signature verification (HMAC SHA256)
- ✅ Cloudinary signed uploads
- ✅ CORS whitelist
- ✅ SQL injection prevention (Prisma parameterized queries)

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Routing | React Router v6 |
| State | Context API + React hooks |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animations | Framer Motion |
| Backend | Node.js, Express.js, TypeScript |
| Database | MySQL 8.0 via Prisma ORM |
| Auth | JWT (access + refresh tokens) |
| Payments | Razorpay + UPI QR |
| Email | Nodemailer + HTML templates |
| Storage | Cloudinary |
| Deployment | Vercel (FE) + Railway (BE) + PlanetScale (DB) |
| CI/CD | GitHub Actions |
| Container | Docker + Docker Compose |

---

## 📊 Pages

| Page | Route | Features |
|---|---|---|
| Home | `/` | Hero, Stats, Mission, Causes, Activities, Testimonials, CTA |
| About | `/about` | Story, Timeline, Leadership Team |
| Causes | `/causes` | 8 cause cards with progress bars |
| Activities | `/activities` | Filterable activity grid with Framer Motion |
| Impact | `/impact` | Live charts — Bar, Line, Pie via Recharts |
| Volunteer | `/volunteer` | Registration form with interests checkboxes |
| Donate | `/donate` | Razorpay integration + UPI QR + 80G badge |
| Gallery | `/gallery` | Masonry grid with Lightbox |
| Transparency | `/transparency` | Certificates + financial breakdown |
| Blog | `/blog` | API-driven listing with fallback |
| Contact | `/contact` | Form with auto-reply emails |
| Admin | `/admin` | Protected dashboard, donations, volunteers, contacts |

---

*Built with ❤️ for DIVYAJOT — Empowering Change, Transforming Lives*

