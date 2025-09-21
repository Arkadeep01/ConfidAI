import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles,
  ArrowRight,
  Users,
  Clock,
  BookOpen,
  Headphones,
  Heart,
  Brain,
  Shield
} from 'lucide-react';
import { ScrollingGallery } from "../components/scrolling/ScrollingGallery";

// Import 10 photos
import photo1 from '../images/photo1.jpg';
import photo2 from '../images/photo2.jpg';
import photo3 from '../images/photo3.jpg';
import photo4 from '../images/photo4.jpg';
import photo5 from '../images/photo5.jpg';
import photo6 from '../images/photo6.jpg';
import photo7 from '../images/photo7.jpg';
import photo8 from '../images/photo8.jpg';
import photo9 from '../images/photo9.jpg';
import photo10 from '../images/photo10.jpg';

interface HomePageProps {
  user?: any;
  isShieldMode?: boolean;
  onAuthClick: () => void;
}

const galleryImages = [
  photo1, photo2, photo3, photo4, photo5,
  photo6, photo7, photo8, photo9, photo10
];

export const HomePage = ({ user, isShieldMode, onAuthClick }: HomePageProps) => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${isShieldMode ? 'shield-mode' : ''} dark:bg-gray-900 dark:text-gray-100`}>
      
      {/* Hero Section with Gallery */}
      <section className="overflow-hidden bg-gradient-to-b from-purple-100 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
        
        {/* Scrolling Gallery */}
        <section className="mb-10">
          <ScrollingGallery images={galleryImages} autoPlay interval={3000}  />
        </section>

        <div className="container mx-auto px-6 text-center max-w-5xl gap-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 dark:bg-primary/20 dark:text-primary-light">
            <Sparkles className="w-4 h-4 mr-2" />AI-Powered Mental Wellness
          </div>

          <h1 className="text-5xl md:text-5xl font-bold leading-tight">
              <>
                Just <span className="primary-gradient text-6xl bg-clip-text text-transparent">Breathe & Relax</span>
                <br />
                Your AI Mental Health Companion
              </>
          </h1>

          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto dark:text-gray-300">
            {isShieldMode 
              ? 'Personalized support, guided wellness tools, and 24/7 crisis intervention in a safe, judgment-free environment.'
              : 'Get personalized support, guided tools, and 24/7 assistance in a safe, judgment-free environment.'
            }
          </p>

          <div className="flex flex-col py-20 sm:flex-row gap-4 justify-center items-center mt-10">
            {user ? (
              <Link 
                to="/dashboard" 
                className="px-8 py-4 primary-gradient text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium flex items-center"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <button 
                onClick={onAuthClick}
                className="px-14 py-4 primary-gradient text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium flex items-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}

            <Link 
              to="/wellness" 
              className="px-16 py-4 border rounded-lg hover:bg-gray-100 transition font-medium dark:hover:bg-gray-700"
            >
              {isShieldMode ? 'Explore Tools' : 'Explore Wellness Tools'}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How Are You Feeling Today?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stress → Breathing */}
            <div
              className="p-6 border rounded-lg text-center hover:shadow-lg transition dark:border-gray-700 cursor-pointer"
              onClick={() => navigate('/wellness?tab=breathing')}
            >
              <Heart className="w-10 h-10 mx-auto text-primary mb-4" />
              <h3 className="font-semibold">Stress</h3>
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                Guided exercises to manage daily stress effectively.
              </p>
            </div>

            {/* Anxiety → Mindful/Games */}
            <div
              className="p-6 border rounded-lg text-center hover:shadow-lg transition dark:border-gray-700 cursor-pointer"
              onClick={() => navigate('/wellness?tab=mindful')}
            >
              <Brain className="w-10 h-10 mx-auto text-primary mb-4" />
              <h3 className="font-semibold">Anxiety</h3>
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                AI-driven relaxation practices and mindfulness tips.
              </p>
            </div>

            {/* Depression → Journal */}
            <div
              className="p-6 border rounded-lg text-center hover:shadow-lg transition dark:border-gray-700 cursor-pointer"
              onClick={() => navigate('/wellness?tab=journal')}
            >
              <BookOpen className="w-10 h-10 mx-auto text-primary mb-4" />
              <h3 className="font-semibold">Depression</h3>
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                Get helpful resources and supportive content daily.
              </p>
            </div>

            {/* Mood Swings → Audio */}
            <div
              className="p-6 border rounded-lg text-center hover:shadow-lg transition dark:border-gray-700 cursor-pointer"
              onClick={() => navigate('/wellness?tab=audio')}
            >
              <Headphones className="w-10 h-10 mx-auto text-primary mb-4" />
              <h3 className="font-semibold">Mood Swings</h3>
              <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                Listen to podcasts & meditations curated for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};