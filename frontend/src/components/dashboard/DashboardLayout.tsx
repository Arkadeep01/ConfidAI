import React, { useState } from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Heart,
  Brain,
  Target,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isShieldMode?: boolean;
}

const sidebarItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
      { title: "Mood Trends", url: "/dashboard/mood", icon: TrendingUp, wellnessOnly: true },
      { title: "Analytics", url: "/dashboard/analytics", icon: Brain, wellnessOnly: true },
    ]
  },
  {
    title: "Content",
    items: [
      { title: "Journals", url: "/dashboard/journals", icon: BookOpen },
      { title: "Goals", url: "/dashboard/goals", icon: Target },
      { title: "Schedule", url: "/dashboard/schedule", icon: Calendar },
    ]
  },
  {
    title: "Settings",
    items: [
      { title: "Wellness Analytics", url: "/dashboard/wellness", icon: Heart, wellnessOnly: true },
      { title: "Personalization", url: "/dashboard/personalization", icon: Settings },
    ]
  }
];

function DashboardSidebar({ isShieldMode, isOpen, onClose }: { isShieldMode?: boolean; isOpen: boolean; onClose: () => void }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getItemTitle = (title: string, wellnessOnly?: boolean) => {
    if (isShieldMode && wellnessOnly) return null;
    if (isShieldMode) {
      const shieldTitles: { [key: string]: string } = {
        'Mood Trends': 'Performance',
        'Journals': 'Notes',
        'Wellness Analytics': 'Settings',
        'Analytics': 'Reports'
      };
      return shieldTitles[title] || title;
    }
    return title;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-60 bg-card border-r transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {sidebarItems.map((group) => {
            const visibleItems = group.items.filter(item => 
              !isShieldMode || !item.wellnessOnly
            );
            
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.title}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {getItemTitle(group.title)}
                </h3>
                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const itemTitle = getItemTitle(item.title, item.wellnessOnly);
                    if (!itemTitle) return null;

                    const Icon = item.icon;
                    const active = isActive(item.url);

                    return (
                      <Link 
                        key={item.url}
                        to={item.url}
                        onClick={onClose}
                        className={`
                          flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors
                          ${active 
                            ? 'bg-primary text-primary-foreground shadow-glow' 
                            : 'hover:bg-accent/50'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{itemTitle}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const DashboardLayout = ({ children, isShieldMode }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full">
      <DashboardSidebar 
        isShieldMode={isShieldMode} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">Dashboard</h1>
          <div className="w-9"></div> {/* Spacer for centering */}
        </div>
        
        <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/20 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};