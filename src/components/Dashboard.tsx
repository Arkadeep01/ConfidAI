import { useState } from "react";
import { BarChart3, TrendingUp, Heart, Brain, Settings, Calendar, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "mood-trends", label: "Mood Trends", icon: TrendingUp },
    { id: "journals", label: "My Journals", icon: Calendar },
    { id: "wellness-analytics", label: "Wellness Analytics", icon: Heart },
    { id: "personalization", label: "Personalization", icon: Settings },
  ];

  const moodData = [
    { day: "Mon", mood: 7, energy: 6, stress: 4 },
    { day: "Tue", mood: 8, energy: 7, stress: 3 },
    { day: "Wed", mood: 6, energy: 5, stress: 6 },
    { day: "Thu", mood: 9, energy: 8, stress: 2 },
    { day: "Fri", mood: 8, energy: 7, stress: 3 },
    { day: "Sat", mood: 9, energy: 9, stress: 1 },
    { day: "Sun", mood: 8, energy: 8, stress: 2 },
  ];

  const wellnessInsights = [
    {
      title: "Stress Levels Improving",
      description: "Your stress levels have decreased by 25% this week",
      trend: "positive",
      value: "25%"
    },
    {
      title: "Consistent Sleep Pattern",
      description: "You've maintained a regular sleep schedule for 5 days",
      trend: "positive",
      value: "5 days"
    },
    {
      title: "Mood Stability",
      description: "Your mood has been consistently positive",
      trend: "stable",
      value: "Good"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <Sidebar className="w-64 border-r border-border">
          <SidebarContent>
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">ConfidAI</span>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.id)}
                        isActive={activeSection === item.id}
                        className="w-full justify-start"
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-6">
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto">
          <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Wellness Dashboard</h1>
              </div>
              <Button variant="default">Export Data</Button>
            </div>
          </header>

          <div className="p-6 space-y-8">
            {activeSection === "overview" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Overall Wellness</CardTitle>
                      <Heart className="h-4 w-4 text-wellness-balance" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">78/100</div>
                      <Progress value={78} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Mood Score</CardTitle>
                      <TrendingUp className="h-4 w-4 text-wellness-energy" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8.2/10</div>
                      <Progress value={82} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">Feeling positive</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
                      <Brain className="h-4 w-4 text-wellness-calm" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Low</div>
                      <Progress value={25} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">25% decrease this week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
                      <BarChart3 className="h-4 w-4 text-wellness-focus" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground mt-1">8 breathing, 4 meditation</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Mood Trends</CardTitle>
                      <CardDescription>Your emotional patterns over the past week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {moodData.map((day, index) => (
                          <div key={day.day} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{day.day}</span>
                              <span className="text-muted-foreground">Mood: {day.mood}/10</span>
                            </div>
                            <Progress value={day.mood * 10} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Wellness Insights</CardTitle>
                      <CardDescription>AI-powered analysis of your wellbeing</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {wellnessInsights.map((insight, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium">{insight.title}</h4>
                              <p className="text-sm text-muted-foreground">{insight.description}</p>
                            </div>
                            <div className="text-lg font-bold text-wellness-balance">
                              {insight.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeSection === "mood-trends" && (
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Mood Analytics</CardTitle>
                  <CardDescription>Comprehensive view of your emotional patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-wellness rounded-lg flex items-center justify-center text-muted-foreground">
                    Advanced mood analytics chart would be rendered here
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "journals" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Journal Entries</CardTitle>
                    <CardDescription>Your personal reflection history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Journal Entry #{index + 1}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Today I felt grateful for the small moments of peace...
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};