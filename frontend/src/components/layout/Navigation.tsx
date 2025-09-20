import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Heart, 
  BookOpen, 
  Mic, 
  Bell, 
  Globe, 
  User, 
  Settings, 
  LogOut,
  BarChart3,
  Menu,
  Moon,
  Sun,
  Shield,
  ChevronDown,
  X
} from 'lucide-react';

interface NavigationProps {
  user?: any;
  onAuthClick: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isShieldMode: boolean;
  onShieldToggle: () => void;
}

export const Navigation = ({ 
  user, 
  onAuthClick, 
  onLogout, 
  isDarkMode, 
  onThemeToggle,
  isShieldMode,
  onShieldToggle 
}: NavigationProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: isShieldMode ? 'Tools' : 'Wellness Tools', path: '/wellness', icon: Heart },
    { label: isShieldMode ? 'Notes' : 'Journal', path: '/journal', icon: BookOpen },
    { label: isShieldMode ? 'Audio' : 'Empathy Voice', path: '/voice', icon: Mic },
    { label: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mai', name: 'मैथिली' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'mr', name: 'मराठी' },
    { code: 'kn', name: 'ಕನ್ನಡ' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`
      border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 transition-colors
      ${isShieldMode ? 'shield-mode' : ''}
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold primary-gradient bg-clip-text text-transparent">
              {isShieldMode ? 'ProductivAI' : 'ConfidAI'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link key={item.path} to={item.path}>
                  <button
                    className={`
                      px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2
                      ${active 
                        ? 'primary-gradient text-white shadow-glow' 
                        : 'hover:bg-accent/50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="hidden sm:flex p-2 hover:bg-accent rounded-md transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Shield Mode Toggle */}
            <button
              onClick={onShieldToggle}
              className={`hidden sm:flex p-2 rounded-md transition-colors ${isShieldMode ? 'bg-accent' : 'hover:bg-accent'}`}
              title={isShieldMode ? 'Exit Privacy Mode' : 'Enter Privacy Mode'}
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
              >
                <Globe className="w-4 h-4" />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg glass z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full px-4 py-2 text-left hover:bg-accent transition-colors first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setIsLanguageMenuOpen(false)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu or Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border rounded-lg shadow-lg glass z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-accent transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link 
                      to="/dashboard" 
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-accent transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link 
                      to="/settings" 
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-accent transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    
                    <button 
                      onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-accent transition-colors text-destructive w-full text-left rounded-b-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-4 py-2 primary-gradient text-white rounded-md hover:shadow-glow transition-all font-medium"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-72 bg-card border-l shadow-xl glass">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">
                  {isShieldMode ? 'ProductivAI' : 'ConfidAI'}
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 hover:bg-accent rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <button
                    onClick={onThemeToggle}
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Privacy Mode</span>
                  <button
                    onClick={onShieldToggle}
                    className={`p-2 rounded-md transition-colors ${isShieldMode ? 'bg-accent' : 'hover:bg-accent'}`}
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {isUserMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
      )}
      {isLanguageMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsLanguageMenuOpen(false)} />
      )}
    </nav>
  );
};