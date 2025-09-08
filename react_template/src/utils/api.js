// Mock API utilities for MVP demo
export const generateFlashcards = async (text) => {
  // Call Hugging Face Inference API
  const HF_API_URL = "https://api-inference.huggingface.co/models/your-model-name";
  const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: text })
  });

  if (!response.ok) {
    throw new Error("Failed to generate flashcards");
  }

  const result = await response.json();
  // Adapt this mapping based on your model's output format
  return result.flashcards || [];
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