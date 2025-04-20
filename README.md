# 🌱 Broccoli & Co. – Invite Request App

This is a single-page web application built for the **Airwallex Frontend Code Challenge**. It allows users to request an invite by submitting their name and email via a clean, responsive, and validated form.

---

## 🚀 Features

- Fully responsive and mobile-friendly layout
- Fixed header and footer with centered main content
- Modal popup with input validation for:
  - Full name (min 3 characters)
  - Valid email format
  - Email confirmation match
- Real API integration:
  - `POST` to https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth
  - Error message handling
- Smooth UI transitions between form and success message
- Comprehensive test coverage using **Jest** and **React Testing Library**

---

## 🛠️ Tech Stack

- **React**
- **Webpack**
- **SASS/SCSS**
- **Jest** + **React Testing Library**
- **Babel**

---

## 📦 Getting Started

- Local Node Version: v22.14.0

```bash
#install dependencies
cd broccoli-invitation
npm i
#run dev server in local, then you can access home page via http://localhost:8080/
npm start
#build
npm run build
#run test cases
npm run test
