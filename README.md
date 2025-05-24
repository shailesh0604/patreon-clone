# 🎨 Patreon Clone

A full-stack Patreon-inspired membership platform built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com/), [MongoDB](https://www.mongodb.com/), and [NextAuth.js](https://next-auth.js.org/). This application enables creators to offer subscription-based content to their supporters.

## 🚀 Live Demo

Check out the live application: [patreon-clone-pi.vercel.app](https://patreon-clone-pi.vercel.app)

## 📂 Project Structure

patreon-clone/
├── app/ # Next.js App Router pages
├── Components/ # Reusable UI components
├── db/ # Database connection and configuration
├── lib/ # Utility functions and helpers
├── models/ # Mongoose models
├── public/ # Static assets
├── .gitignore # Git ignore rules
├── README.md # Project documentation
├── jsconfig.json # JavaScript configuration
├── middleware.js # Custom middleware
├── next.config.mjs # Next.js configuration
├── package.json # Project metadata and scripts
├── postcss.config.js # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration



## 🛠️ Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **cloud media management services**: Cloudinary

## ✅ Features

- User authentication with NextAuth.js
- Creator and supporter dashboards
- Subscription management
- Content creation and access control
- Responsive design for all devices

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shailesh0604/patreon-clone.git
   cd patreon-clone

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up environment variables:**
Create a .env.local file in the root directory and add the following:
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

4. **Run the development server:**

   ```bash
   npm run dev



