# 🎨 Patreon Clone

A full-stack Patreon-inspired membership platform built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com/), [MongoDB](https://www.mongodb.com/), and [NextAuth.js](https://next-auth.js.org/). This application enables creators to offer subscription-based content to their supporters.

## 🚀 Live Project

Check out the live application: [patreon-clone-pi.vercel.app](https://patreon-clone-pi.vercel.app)

## 📂 Project Structure

patreon-clone/ <br />
├── app/ # Next.js App Router pages <br />
├── Components/ # Reusable UI components <br />
├── db/ # Database connection and configuration <br />
├── lib/ # Utility functions and helpers <br />
├── models/ # Mongoose models <br />
├── public/ # Static assets <br />
├── .gitignore # Git ignore rules <br />
├── README.md # Project documentation <br />
├── jsconfig.json # JavaScript configuration <br />
├── middleware.js # Custom middleware <br />
├── next.config.mjs # Next.js configuration<br />
├── package.json # Project metadata and scripts<br />
├── postcss.config.js # PostCSS configuration<br />
├── tailwind.config.js # Tailwind CSS configuration<br />

## 🛠️ Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Animation**: GSAP & Framer Motion
- **UI Library**: Aceternity UI & Reactbits
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Cloud Media Management Services**: Cloudinary
- **Payment Gateway**: Razorpay

## ✅ Features

- User authentication with NextAuth.js<br />
- Creator and supporter dashboards<br />
- Subscription management<br />
- Content creation and access control<br />
- Responsive design for all devices<br />

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shailesh0604/patreon-clone.git
   cd patreon-clone

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up environment variables:**<br />
   Create a .env.local file in the root directory and add the following:<br />
   MONGODB_URI=your_mongodb_connection_string<br />
   NEXTAUTH_URL=http://localhost:3000<br />
   NEXTAUTH_SECRET=your_nextauth_secret<br />

4. **Run the development server:**

   ```bash
   npm run dev
   ```
