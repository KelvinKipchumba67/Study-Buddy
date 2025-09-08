# AI Study Buddy App

A full-stack web application to enhance learning by generating interactive flashcards using AI. Built with React, Vite, and TailwindCSS, it features authentication, payment integration, and user dashboards.

---

## Features

- **AI Flashcard Generator:** Convert text into study flashcards using AI (Hugging Face or OpenAI).
- **User Authentication:** Email/password and Google login via Firebase Auth.
- **Dashboard:** Track study progress and manage flashcards.
- **Payments:** Stripe integration for premium features.
- **Responsive UI:** Modern design with TailwindCSS and Framer Motion animations.

---

## Project Structure

```
├── src/
│   ├── App.jsx                # Main app component & routing
│   ├── main.jsx               # React entry point
│   ├── index.css              # Global styles
│   ├── components/
│   │   ├── AuthPage.jsx       # Login/Signup UI
│   │   ├── Dashboard.jsx      # User dashboard
│   │   ├── FlashcardGenerator.jsx # Flashcard creation
│   │   ├── LandingPage.jsx    # Landing page
│   ├── utils/
│   │   ├── api.js             # API utilities
│   │   ├── firebase.js        # Firebase config
├── public/
│   ├── assets/                # Images & static files
│   ├── data/example.json      # Example data
├── index.html                 # HTML template
├── vite.config.js             # Vite config
├── tailwind.config.js         # Tailwind config
├── postcss.config.js          # PostCSS config
├── eslint.config.js           # ESLint config
├── .env                       # Environment variables (not tracked by git)
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Start development server:**
   ```bash
   pnpm run dev
   ```
3. **Lint code:**
   ```bash
   pnpm run lint
   ```
4. **Build for production:**
   ```bash
   pnpm run build
   ```

---

## Environment Variables

Store sensitive keys in `.env` (excluded from git):

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

---

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Firebase Auth
- Stripe
- Framer Motion
- Lucide React (icons)

---

## Contributing

1. Fork the repo and create a feature branch.
2. Commit changes with clear messages.
3. Open a pull request for review.

---

## License

MIT

---

## Contact

For questions or support, open an issue or contact the maintainer.
