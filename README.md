# Pet Adoption Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=vercel)](https://peddify-pet-adoption-website.vercel.app)

A modern, full-featured web application for pet adoption, built with React, Material UI, and Recharts. This project demonstrates advanced UI/UX, admin and user flows, analytics, and a beautiful, responsive design.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Development Process](#development-process)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Credits](#credits)

---

## Project Overview
This project was created to provide a seamless, engaging experience for users looking to adopt pets and for admins managing adoption requests. It features:
- Advanced search and filtering for pets
- User authentication and profiles
- Admin dashboard with analytics
- Favorites, notifications, and more

## Features
### User Side
- **Browse & Search Pets:** Filter by type, breed, size, and more with a modern UI.
- **Pet Details:** View detailed info, images, and adoption status.
- **Adoption Requests:** Request to adopt, track status, and see confirmation.
- **Favorites:** Save favorite pets for quick access.
- **Profile Page:** Edit info, upload avatar, view adoption history.
- **Dark Mode:** Per-page, beautiful dark mode with gradients and custom backgrounds.
- **Mobile Friendly:** Responsive layouts, mobile nav drawer, and touch-friendly controls.

### Admin Side
- **Admin Dashboard:** Review, approve, reject, or remove adoption requests.
- **Analytics:** See total pets, adoptions, pending requests, users, adoptions over time, request status, and most recently adopted breed.
- **Restore Pets:** Reset adoption status for all pets.
- **Remove Requests:** Clean up or manage adoption requests.

### UI/UX
- **Modern Navigation:** Hide-on-scroll nav bar, tooltips, icons, and glowing effects.
- **Notifications:** Interactive bell with notification count.
- **Accessibility:** Tooltips, clear focus states, and keyboard navigation.

## Tech Stack
- **Frontend:** React 19, Material UI, Recharts, Framer Motion
- **Routing:** React Router DOM
- **State:** LocalStorage (for demo), React Context
- **Testing:** React Testing Library, Jest

## Development Process
1. **Bootstrapped with Create React App.**
2. **Initial Features:** Pet browsing, adoption flow, admin approval, and user authentication.
3. **UI/UX Enhancements:**
   - Per-page dark mode, gradients, and custom backgrounds
   - Modern navigation bar with hide/show on scroll
   - Mobile navigation drawer
   - Tooltips and interactive icons
4. **Advanced Search:**
   - Collapsible filter panel, multi-select, filter chips, and responsive layout
5. **Profile Page Overhaul:**
   - Avatar upload, editable info, animated adoption history, and modern card design
6. **Admin Analytics:**
   - Stats cards, charts (adoptions over time, request status, most recently adopted breed)
7. **Continuous Feedback:**
   - Iterative improvements based on user feedback for spacing, overflow, and visual polish

## Setup & Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Pet Addoption Website/pet-adoption-website
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
4. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Usage
- **Admin Login:** Use `admin@petadopt.com` to access the admin dashboard.
- **User Registration:** Sign up as a new user to adopt pets, save favorites, and manage your profile.
- **Adoption Flow:**
  1. Browse pets and request adoption.
  2. Admin reviews and approves/rejects requests.
  3. Users see status updates and confirmation.

## Deployment

### Deploying to Vercel (Recommended)
1. **Push your code to GitHub.**
2. Go to [https://vercel.com/](https://vercel.com/) and sign up/log in with your GitHub account.
3. Click **"New Project"** and import your `Peddify-pet-adoption-website` repository.
4. Accept the defaults (Vercel auto-detects Create React App):
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Click **"Deploy"**.
6. After a minute, your site will be live at a `vercel.app` URL:
   - **Live Site:** [https://peddify-pet-adoption-website.vercel.app](https://peddify-pet-adoption-website.vercel.app)
7. Every push to your GitHub repo will auto-deploy new changes.

## Folder Structure
```
pet-adoption-website/
  src/
    components/      # Reusable UI components (Footer, NotificationsBell, etc.)
    data/            # Static data (pets.js)
    images/          # App images and logos
    pages/           # Main app pages (Home, Pets, Adopt, Auth, Profile, AdminDashboard, etc.)
    App.js           # Main app component
    index.js         # Entry point
```

## Credits
- **UI Library:** [Material UI](https://mui.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Material Icons](https://mui.com/components/material-icons/)
- **Starter:** [Create React App](https://create-react-app.dev/)

---

### Extend or Contribute
- Fork the repo and submit a pull request for new features (pet stories, testimonials, push notifications, etc.)
- For questions or suggestions, open an issue.

---

## Author & Contact

- **GitHub:** [SahilVijaySingh28](https://github.com/SahilVijaySingh28)
- **Email:** sahilvijaysingh15@gmail.com
- **Instagram:** [@btwitxsahil](https://instagram.com/btwitxsahil)

---

**Enjoy using and building on the Pet Adoption Website!**
