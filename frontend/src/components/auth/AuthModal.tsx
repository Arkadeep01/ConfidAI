import React, { useState } from 'react';
import { Mail, Phone, Lock, User, Eye, EyeOff, X } from 'lucide-react';
import { GoogleIcon, FacebookIcon, InstagramIcon } from '@/components/icons/SocialIcons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: any) => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const socialLogins = [
    { icon: GoogleIcon, name: 'Google', color: 'text-red-500' },
    { icon: FacebookIcon, name: 'Facebook', color: 'text-blue-600' },
    { icon: InstagramIcon, name: 'Instagram', color: 'text-pink-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card rounded-lg shadow-xl border p-6 glass">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold primary-gradient bg-clip-text text-transparent">
              {isSignIn ? 'Welcome Back' : 'Join ConfidAI'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-accent rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground text-center">
            {isSignIn ? 'Continue your wellness journey' : 'Start your mental wellness journey today'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Social Login Options */}
          <div className="space-y-3">
            <p className="text-sm text-center text-muted-foreground">Continue with</p>
            <div className="flex gap-3 justify-center">
              {socialLogins.map(({ icon: Icon, name, color }) => (
                <button
                  key={name}
                  className="flex-1 px-4 py-2 border rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                  onClick={() => onLogin({ provider: name.toLowerCase() })}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Login Method Toggle */}
          <div className="flex rounded-lg bg-muted p-1">
            <button
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                authMethod === 'email' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
              onClick={() => setAuthMethod('email')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </button>
            <button
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                authMethod === 'phone' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
              onClick={() => setAuthMethod('phone')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignIn && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
              </div>
            )}

            {authMethod === 'email' ? (
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
            )}

            {authMethod === 'phone' && !isSignIn && (
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">Verification Code</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                />
                <button type="button" className="text-sm text-primary hover:underline">
                  Resend code
                </button>
              </div>
            )}

            {authMethod === 'email' && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isSignIn ? 'Enter your password' : 'Create a password'}
                    className="w-full pl-10 pr-10 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {isSignIn && (
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 primary-gradient text-white rounded-md hover:shadow-glow transition-all font-medium"
            >
              {isSignIn ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary font-medium">
                {isSignIn ? 'Sign up' : 'Sign in'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};