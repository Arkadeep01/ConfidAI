import React, { useState } from 'react';
import { 
  Heart, 
  Wind, 
  Headphones, 
  BookOpen, 
  Play, 
  Pause, 
  Timer,
  Brain,
  Palette
} from 'lucide-react';

interface WellnessPageProps {
  isShieldMode?: boolean;
  user?: any;
}

export const WellnessPage = ({ isShieldMode, user }: WellnessPageProps) => {
  const [activeTab, setActiveTab] = useState('breathing');

  return (
    <div className={`min-h-screen py-8 ${isShieldMode ? 'shield-mode' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isShieldMode ? 'Productivity & Focus Tools' : 'Relax & Wellness Tools'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isShieldMode
                ? 'Enhance your productivity with science-backed techniques for focus and mental clarity.'
                : 'Discover personalized tools to support your mental wellness journey and find inner peace.'
              }
            </p>
          </div>

          <div className="flex space-x-2 mb-8 bg-muted p-1 rounded-lg">
            {[
              { id: 'breathing', label: isShieldMode ? 'Focus' : 'Breathing', icon: Wind },
              { id: 'audio', label: 'Audio', icon: Headphones },
              { id: 'journal', label: isShieldMode ? 'Notes' : 'Journal', icon: BookOpen },
              { id: 'games', label: isShieldMode ? 'Games' : 'Mindful Games', icon: Brain }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                  activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'breathing' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-lg border shadow">
                <h3 className="text-lg font-semibold mb-2">Box Breathing</h3>
                <p className="text-muted-foreground mb-4">4-4-4-4 pattern for calm focus</p>
                <button className="w-full px-4 py-2 primary-gradient text-white rounded-md hover:shadow-glow transition-all flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Start Exercise
                </button>
              </div>
            </div>
          )}

          {activeTab === 'journal' && (
            <div className="max-w-4xl mx-auto">
              <div className="p-6 bg-card rounded-lg border shadow">
                <h2 className="text-xl font-semibold mb-4">AI-Generated Prompts</h2>
                <div className="p-6 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border mb-4">
                  <blockquote className="text-lg italic font-medium">
                    "What am I feeling grateful for today?"
                  </blockquote>
                </div>
                <button className="px-4 py-2 primary-gradient text-white rounded-md hover:shadow-glow transition-all">
                  Start Writing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};