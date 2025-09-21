import React  from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Brain, 
  BookOpen, 
  Headphones, 
  BarChart3, 
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  Clock
} from 'lucide-react';

interface HomePageProps {
  user?: any;
  isShieldMode?: boolean;
  onAuthClick: () => void;
}

export const HomePage = ({ user, isShieldMode, onAuthClick }: HomePageProps) => {
  return (
    <div className={`min-h-screen ${isShieldMode ? 'shield-mode' : ''}`}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 calm-gradient opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center mt-10 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              {isShieldMode ? 'Productivity Reimagined' : 'AI-Powered Mental Wellness'}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {isShieldMode ? (
                <>
                  Boost Your <span className="primary-gradient bg-clip-text text-transparent">Productivity</span>
                  <br />
                  With AI Assistance
                </>
              ) : (
                <>
                  Your Mental Health <span className="primary-gradient bg-clip-text text-transparent">Companion</span>
                  <br />
                  Powered by AI
                </>
              )}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isShieldMode 
                ? 'Intelligent tools to optimize your workflow, manage tasks, and maintain work-life balance with personalized insights.'
                : 'Personalized support, guided wellness tools, and 24/7 crisis intervention in a safe, judgment-free environment.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/dashboard" className="px-6 py-3 mt-20 primary-gradient text-white rounded-md hover:shadow-glow transition-all font-medium inline-flex items-center">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="px-6 py-3 mt-20 primary-gradient text-white rounded-md hover:shadow-glow transition-all font-medium inline-flex items-center"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
              
              <Link to="/wellness" className="px-6 py-3 mt-20 border rounded-md hover:bg-accent transition-colors font-medium">
                {isShieldMode ? 'Explore Tools' : 'Explore Wellness Tools'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};