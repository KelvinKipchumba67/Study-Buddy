# AI Study Buddy - MVP Development Plan

## Core Files to Create/Modify (Max 8 files limit - focusing on essential MVP features)

### Frontend Files:
1. **src/App.jsx** - Main app with routing, auth context, and core layout
2. **src/components/LandingPage.jsx** - Stunning homepage with hero, features, pricing
3. **src/components/Dashboard.jsx** - Main dashboard with flashcard generation and management
4. **src/components/AuthPage.jsx** - Combined login/signup page
5. **src/components/FlashcardGenerator.jsx** - AI flashcard generation component
6. **src/utils/firebase.js** - Firebase auth configuration
7. **src/utils/api.js** - API utilities for backend communication
8. **index.html** - Update title and meta tags

## MVP Feature Implementation:
- ✅ Landing page with hero, features, pricing sections
- ✅ Firebase Authentication (email/password + Google)
- ✅ AI flashcard generation (mock API for MVP - can be upgraded to real AI)
- ✅ Basic flashcard display with flip animations
- ✅ Free vs Premium user limits (5 cards/day vs unlimited)
- ✅ Stripe payment integration (frontend only for MVP)
- ✅ Responsive design with Tailwind CSS
- ✅ Smooth animations throughout

## Simplified for MVP Success:
- Using Firebase for both auth and basic user data storage
- Mock AI API responses for reliable demo
- Frontend-focused with simulated backend interactions
- Essential UI components only to stay within file limit

## Tech Stack:
- Frontend: React + Vite + TailwindCSS + Firebase
- Animations: CSS transitions and transforms
- Icons: Lucide React
- Payments: Stripe Checkout (frontend integration)