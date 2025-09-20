import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { 
  TrendingUp, 
  Heart, 
  Brain, 
  Calendar, 
  Target,
  Clock,
  BookOpen,
  Zap,
  Shield,
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  user?: any;
  isShieldMode?: boolean;
}

export const Dashboard = ({ user, isShieldMode }: DashboardProps) => {
  return (
    <DashboardLayout isShieldMode={isShieldMode}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">
              {isShieldMode ? 'Productivity Dashboard' : 'Wellness Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {user?.name ? `Welcome back, ${user.name}!` : 'Welcome to your personal dashboard'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-card rounded-lg border shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">
                {isShieldMode ? 'Performance Score' : 'Wellness Score'}
              </h3>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">78%</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent/50">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">{isShieldMode ? 'Daily Reflection' : 'Morning Journal Entry'}</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};