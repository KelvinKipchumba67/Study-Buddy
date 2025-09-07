import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { User, LogOut, Crown, Flame, Target, Calendar, TrendingUp } from 'lucide-react';
import FlashcardGenerator from './FlashcardGenerator';
import { getUserUsage, getUserPremiumStatus, createStripeCheckout } from '../utils/api';

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('generate');
  const [studyStreak, setStudyStreak] = useState(7); // Mock streak
  const [totalCards, setTotalCards] = useState(42); // Mock total

  const isPremium = getUserPremiumStatus(user.uid);
  const dailyUsage = getUserUsage(user.uid);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpgrade = async () => {
    try {
      const checkout = await createStripeCheckout('price_premium');
      window.open(checkout.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  const tabs = [
    { id: 'generate', label: 'Generate', icon: '🧠' },
    { id: 'saved', label: 'Saved Decks', icon: '📚', premium: true },
    { id: 'analytics', label: 'Analytics', icon: '📊', premium: true },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Study Buddy</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Premium Badge */}
              {isPremium ? (
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full">
                  <Crown className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Premium</span>
                </div>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <Crown className="w-4 h-4" />
                  Upgrade
                </button>
              )}

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {user.displayName || user.email?.split('@')[0]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isPremium ? 'Premium Member' : `${dailyUsage}/5 cards today`}
                  </div>
                </div>
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=6366f1&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleSignOut}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Study Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{studyStreak} days</div>
                    <div className="text-sm text-gray-500">Study streak</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{totalCards}</div>
                    <div className="text-sm text-gray-500">Cards created</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">89%</div>
                    <div className="text-sm text-gray-500">Success rate</div>
                  </div>
                </div>
              </div>
            </div>

            <nav className="bg-white rounded-xl shadow-sm p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    disabled={tab.premium && !isPremium}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    } ${tab.premium && !isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                    {tab.premium && !isPremium && (
                      <Crown className="w-4 h-4 text-gray-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'generate' && <FlashcardGenerator user={user} />}
            
            {activeTab === 'saved' && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-6">
                  Save and organize your flashcard decks with Premium membership
                </p>
                <button
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Upgrade to Premium
                </button>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Analytics</h3>
                <p className="text-gray-600 mb-6">
                  Track your learning progress and performance with detailed analytics
                </p>
                <button
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Upgrade to Premium
                </button>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=6366f1&color=fff`}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.displayName || 'Anonymous User'}
                      </h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {isPremium ? (
                          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                            <Crown className="w-3 h-3" />
                            Premium Member
                          </span>
                        ) : (
                          <span className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            Free Account
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Account Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{totalCards}</div>
                        <div className="text-sm text-gray-600">Total flashcards created</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900">{studyStreak}</div>
                        <div className="text-sm text-gray-600">Day study streak</div>
                      </div>
                    </div>
                  </div>

                  {!isPremium && (
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Upgrade to Premium</h4>
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Crown className="w-6 h-6 text-purple-600" />
                          <span className="font-semibold text-purple-900">Premium Benefits</span>
                        </div>
                        <ul className="text-sm text-purple-800 space-y-1 mb-4">
                          <li>• Unlimited flashcard generation</li>
                          <li>• Save and organize decks</li>
                          <li>• Export to PDF/CSV</li>
                          <li>• Advanced study analytics</li>
                          <li>• Priority support</li>
                        </ul>
                        <button
                          onClick={handleUpgrade}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                        >
                          Upgrade Now - $9.99/month
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;