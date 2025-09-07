import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('landing');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleAuthSuccess = (user) => {
    setUser(user);
    setCurrentPage('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading AI Study Buddy...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentPage === 'auth') {
    return (
      <AuthPage 
        onBack={handleBackToLanding}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  if (currentPage === 'dashboard' && user) {
    return <Dashboard user={user} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}

export default App;