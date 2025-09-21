import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: any;
  children: React.ReactNode;
  onAuthRequired: () => void; // 👈 callback to open AuthModal
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children, onAuthRequired }) => {
  useEffect(() => {
    if (!user) {
      // If user is not logged in, trigger signup/login modal
      onAuthRequired();
    }
  }, [user, onAuthRequired]);

  if (!user) {
    // Redirect back to homepage
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};