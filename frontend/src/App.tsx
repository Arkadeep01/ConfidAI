import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import { AuthModal } from "./components/auth/AuthModal";
import { FloatingChatbot } from "./components/chat/FloatingChatbot";
import { HomePage } from "./Pages/HomePage";
import { WellnessPage } from "./Pages/WellnessPage";
import { Dashboard } from "./Pages/Dashboard";
import { ProtectedRoute } from "./components/router/ProtectedRoute";
import { JournalPage } from "./Pages/JournalPage";


const App = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShieldMode, setIsShieldMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedShieldMode = localStorage.getItem("shieldMode");

    setIsDarkMode(savedTheme === "dark");
    setIsShieldMode(savedShieldMode === "true");

    // Apply theme to document
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleLogin = (credentials: any) => {
    // Simulate login process
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: credentials.email || "user@example.com",
      avatar: null,
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleShieldToggle = () => {
    const newShieldMode = !isShieldMode;
    setIsShieldMode(newShieldMode);
    localStorage.setItem("shieldMode", newShieldMode.toString());
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        {/* Top Navigation */}
        <Navigation
          user={user}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
          isShieldMode={isShieldMode}
          onShieldToggle={handleShieldToggle}
        />

        {/* Routes */}
        <Routes>
          {/* ✅ Public Homepage */}
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                isShieldMode={isShieldMode}
                onAuthClick={() => setIsAuthModalOpen(true)}
              />
            }
          />

          {/* ✅ Protected Pages */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute
                user={user}
                onAuthRequired={() => setIsAuthModalOpen(true)}
              >
                <Dashboard user={user} isShieldMode={isShieldMode} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wellness"
            element={
              <ProtectedRoute
                user={user}
                onAuthRequired={() => setIsAuthModalOpen(true)}
              >
                <WellnessPage user={user} isShieldMode={isShieldMode} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/journal"
            element={
              <ProtectedRoute
                user={user}
                onAuthRequired={() => setIsAuthModalOpen(true)}
              >
                {/* ✅ Now showing actual JournalPage */}
                <JournalPage user={user} isShieldMode={isShieldMode} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/voice"
            element={
              <ProtectedRoute
                user={user}
                onAuthRequired={() => setIsAuthModalOpen(true)}
              >
                <div className="p-8 text-center">
                  Empathy Voice Page Coming Soon
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute
                user={user}
                onAuthRequired={() => setIsAuthModalOpen(true)}
              >
                <div className="p-8 text-center">
                  Notifications Page Coming Soon
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Floating chatbot */}
        <FloatingChatbot
          user={user}
          isShieldMode={isShieldMode}
          onRequireAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;