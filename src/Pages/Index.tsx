import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { ChatBot } from "../components/ChatBot";
import { AuthModal } from "../components/AuthModal";
import { WellnessTools } from "../components/WellnessTools";
import { Dashboard } from "../components/Dashboard";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'wellness' | 'dashboard'>('home');

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as 'home' | 'wellness' | 'dashboard');
  };

  if (currentView === 'dashboard') {
    return <Dashboard />;
  }

  if (currentView === 'wellness') {
    return (
      <div className="min-h-screen">
        <Navigation 
          onAuthClick={() => setShowAuth(true)} 
          onNavigate={handleNavigate}
          currentView={currentView}
        />
        <div className="pt-16">
          <WellnessTools />
        </div>
        <ChatBot />
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation 
        onAuthClick={() => setShowAuth(true)} 
        onNavigate={handleNavigate}
        currentView={currentView}
      />
      
      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Comprehensive{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Mental Wellness
              </span>{" "}
              Support
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ConfidAI combines cutting-edge AI technology with evidence-based wellness practices 
              to provide personalized mental health support that adapts to your unique needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-gentle hover:shadow-wellness transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Advanced sentiment analysis and mood tracking to understand your emotional patterns and provide personalized recommendations.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-gentle hover:shadow-wellness transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Privacy</h3>
              <p className="text-muted-foreground">
                Stigma Shield mode disguises the app as a productivity tool, ensuring your mental health journey remains completely private.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-gentle hover:shadow-wellness transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Multilingual Support</h3>
              <p className="text-muted-foreground">
                Express yourself in your preferred language with support for English, Hindi, Bengali, Tamil, and more regional languages.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-gentle hover:shadow-wellness transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Wellness Analytics</h3>
              <p className="text-muted-foreground">
                Track your progress with detailed analytics, mood trends, and personalized insights to support your mental health journey.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-gentle hover:shadow-wellness transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Guided Wellness Tools</h3>
              <p className="text-muted-foreground">
                Access breathing exercises, meditation guides, calming audio, and journaling tools designed by mental health professionals.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-gentle hover:shadow-wellness transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 AI Companion</h3>
              <p className="text-muted-foreground">
                Your personal wellness companion is available around the clock to provide support, guidance, and a safe space to express yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-wellness">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who have found peace and support with ConfidAI. 
            Your mental health matters, and we're here to help every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg shadow-wellness hover:shadow-floating transition-all duration-300 hover:scale-105"
            >
              Get Started Free
            </button>
            <button 
              onClick={() => setCurrentView('wellness')}
              className="px-8 py-4 border border-primary/30 text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300"
            >
              Explore Tools
            </button>
          </div>
        </div>
      </section>
      
      {/* Floating Chatbot */}
      <ChatBot />
      
      {/* Authentication Modal */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default Index;
