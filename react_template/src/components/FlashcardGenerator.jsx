import { useState } from 'react';
import { Brain, Sparkles, RotateCcw, Download, Save } from 'lucide-react';
import { generateFlashcards, getUserUsage, incrementUserUsage, getUserPremiumStatus } from '../utils/api';

const FlashcardGenerator = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [error, setError] = useState('');

  const isPremium = getUserPremiumStatus(user.uid);
  const dailyUsage = getUserUsage(user.uid);
  const canGenerate = isPremium || dailyUsage < 5;

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to generate flashcards');
      return;
    }

    if (!canGenerate) {
      setError('You have reached your daily limit of 5 flashcards. Upgrade to Premium for unlimited access!');
      return;
    }

    setError('');
    setLoading(true);
    setFlashcards([]);
    setFlippedCards(new Set());

    try {
      const cards = await generateFlashcards(inputText);
      setFlashcards(cards);
      
      if (!isPremium) {
        incrementUserUsage(user.uid);
      }
    } catch (error) {
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFlip = (cardId) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(cardId)) {
      newFlipped.delete(cardId);
    } else {
      newFlipped.add(cardId);
    }
    setFlippedCards(newFlipped);
  };

  const handleExport = () => {
    if (flashcards.length === 0) return;
    
    const csvContent = 'Front,Back\n' + 
      flashcards.map(card => `"${card.front}","${card.back}"`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          AI Flashcard Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Transform your study materials into interactive flashcards with AI
        </p>
        
        {/* Usage Stats */}
        <div className="mt-4 flex justify-center items-center gap-4 text-sm">
          <div className={`px-3 py-1 rounded-full ${isPremium ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
            {isPremium ? '✨ Premium User' : `${dailyUsage}/5 cards used today`}
          </div>
          {!isPremium && (
            <div className="text-blue-600 hover:text-blue-700 cursor-pointer">
              Upgrade to Premium →
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your study material
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your notes, textbook content, or any text you want to turn into flashcards..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {inputText.length} characters
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Generate Flashcards
              </>
            )}
          </button>
        </div>
      </div>

      {/* Flashcards Display */}
      {flashcards.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Generated Flashcards ({flashcards.length})
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setFlippedCards(new Set())}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Flips
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcards.map((card) => (
              <div
                key={card.id}
                className="relative h-48 cursor-pointer group"
                onClick={() => toggleFlip(card.id)}
              >
                <div className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  flippedCards.has(card.id) ? 'rotate-y-180' : ''
                }`}>
                  {/* Front of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg flex items-center justify-center p-6 text-white">
                    <div className="text-center">
                      <Sparkles className="w-6 h-6 mx-auto mb-3 opacity-75" />
                      <p className="text-lg font-medium leading-relaxed">{card.front}</p>
                      <div className="absolute bottom-4 right-4 text-xs opacity-75">
                        Click to reveal
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border-2 border-gray-200 rounded-xl shadow-lg flex items-center justify-center p-6">
                    <div className="text-center">
                      <p className="text-gray-800 leading-relaxed">{card.back}</p>
                      <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                        Click to flip back
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {flashcards.length === 0 && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Ready to Generate Flashcards?
          </h3>
          <p className="text-gray-500">
            Enter your study material above and let AI create interactive flashcards for you
          </p>
        </div>
      )}
    </div>
  );
};

export default FlashcardGenerator;