import { useState } from "react";
import { Menu, X, Brain, User, Globe, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabaseClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavigationProps {
  onAuthClick?: () => void;
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export const Navigation = ({ onAuthClick, onNavigate, currentView }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", view: "home" },
    { label: "Relax & Wellness Tools", view: "wellness" },
    { label: "Journal", view: "journal" },
    { label: "Empathy Voice", view: "voice" },
    { label: "Dashboard", view: "dashboard" },
  ];

  const languages = [
    { label: "English", code: "en" },
    { label: "हिन्दी", code: "hi" },
    { label: "বাংলা", code: "bn" },
    { label: "मैथिली", code: "mai" },
    { label: "தமிழ்", code: "ta" },
    { label: "मराठी", code: "mr" },
    { label: "ಕನ್ನಡ", code: "kn" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-gentle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              ConfidAI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate?.(item.view)}
                className={`text-foreground hover:text-primary transition-colors duration-300 font-medium ${
                  currentView === item.view ? 'text-primary font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} className="text-sm">
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Bell className="w-4 h-4" />
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sign In Button */}
            <Button onClick={onAuthClick} variant="default" className="ml-2">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-in-left">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate?.(item.view);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200 ${
                  currentView === item.view ? 'text-primary bg-muted' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2 space-y-2">
              <Button 
                onClick={() => {
                  onAuthClick?.();
                  setIsMenuOpen(false);
                }} 
                variant="default" 
                className="w-full"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};