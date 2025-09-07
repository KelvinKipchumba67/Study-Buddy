import { useState } from 'react';
import { Brain, Zap, Star, Check, ArrowRight, Sparkles, BookOpen, Trophy } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useState(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Generation",
      description: "Transform any text into smart flashcards using advanced AI technology"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Creation",
      description: "Generate multiple flashcards in seconds from your study materials"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Smart Learning",
      description: "Interactive flashcards with flip animations for effective memorization"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Study Streaks",
      description: "Track your progress and build consistent study habits"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "5 flashcards per day",
        "Basic AI generation",
        "Simple flashcard view",
        "Mobile responsive"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "month",
      features: [
        "Unlimited flashcards",
        "Advanced AI models",
        "Save & organize decks",
        "Export to PDF/CSV",
        "Priority support",
        "Study analytics"
      ],
      cta: "Upgrade to Premium",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-4 border border-white border-opacity-20">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            AI Study Buddy
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Transform your study materials into interactive flashcards with the power of AI. 
            <span className="text-purple-300 font-semibold"> Study smarter, not harder.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-2 text-gray-300">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>No credit card required</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-300">10K+</div>
              <div className="text-gray-400">Flashcards Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-300">5K+</div>
              <div className="text-gray-400">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-300">98%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-300">24/7</div>
              <div className="text-gray-400">AI Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to revolutionize your study experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300">
              Start free, upgrade when you're ready for more power
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-purple-400 bg-opacity-10' 
                    : 'border-white border-opacity-10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 px-6 rounded-full font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:shadow-lg'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-20 text-white border border-white border-opacity-20'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already studying smarter with AI-powered flashcards
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;