// Mock API utilities for MVP demo
export const generateFlashcards = async (text) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock AI-generated flashcards
  const mockCards = [
    {
      id: 1,
      front: "What is photosynthesis?",
      back: "The process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen."
    },
    {
      id: 2,
      front: "What are the main components needed for photosynthesis?",
      back: "Sunlight, water (H2O), carbon dioxide (CO2), and chlorophyll."
    },
    {
      id: 3,
      front: "Where does photosynthesis occur in plants?",
      back: "Primarily in the leaves, specifically in the chloroplasts containing chlorophyll."
    },
    {
      id: 4,
      front: "What is the chemical equation for photosynthesis?",
      back: "6CO2 + 6H2O + light energy → C6H12O6 + 6O2"
    }
  ];
  
  // Return a subset based on text length
  const numCards = Math.min(Math.ceil(text.length / 100), 4);
  return mockCards.slice(0, numCards);
};

export const createStripeCheckout = async (priceId) => {
  // Mock Stripe checkout for MVP
  return {
    url: `https://checkout.stripe.com/pay/demo-session-${priceId}`,
    sessionId: `cs_demo_${Date.now()}`
  };
};

export const getUserUsage = (userId) => {
  // Mock user usage tracking
  const today = new Date().toDateString();
  const storageKey = `usage_${userId}_${today}`;
  const usage = localStorage.getItem(storageKey);
  return usage ? parseInt(usage) : 0;
};

export const incrementUserUsage = (userId) => {
  const today = new Date().toDateString();
  const storageKey = `usage_${userId}_${today}`;
  const currentUsage = getUserUsage(userId);
  localStorage.setItem(storageKey, (currentUsage + 1).toString());
};

export const getUserPremiumStatus = (userId) => {
  // Mock premium status check
  return localStorage.getItem(`premium_${userId}`) === 'true';
};

export const setPremiumStatus = (userId, isPremium) => {
  localStorage.setItem(`premium_${userId}`, isPremium.toString());
};