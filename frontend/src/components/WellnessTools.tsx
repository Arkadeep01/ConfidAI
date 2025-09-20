import { useState } from "react";
import { Waves, Headphones, PenTool, BarChart3, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const WellnessTools = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [journalEntry, setJournalEntry] = useState("");
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const breathingExercises = [
    { name: "4-7-8 Breathing", duration: "4 minutes", description: "Inhale for 4, hold for 7, exhale for 8" },
    { name: "Box Breathing", duration: "5 minutes", description: "Equal counts for inhale, hold, exhale, hold" },
    { name: "Belly Breathing", duration: "3 minutes", description: "Deep diaphragmatic breathing technique" }
  ];

  const calmingAudios = [
    { name: "Ocean Waves", duration: "10 min", category: "Nature" },
    { name: "Forest Rain", duration: "15 min", category: "Nature" },
    { name: "Meditation Bell", duration: "5 min", category: "Meditation" },
    { name: "White Noise", duration: "20 min", category: "Focus" }
  ];

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "How are you feeling right now, and what might be causing those feelings?",
    "What's one small win you accomplished today?",
    "What would you like to let go of today?",
    "Describe a moment of peace you experienced recently."
  ];

  const startBreathing = (exercise: string) => {
    setBreathingActive(true);
    setBreathingProgress(0);
    
    // Simulate breathing exercise progress
    const interval = setInterval(() => {
      setBreathingProgress((prev) => {
        if (prev >= 100) {
          setBreathingActive(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 100);
  };

  const toggleAudio = (audioName: string) => {
    if (currentAudio === audioName) {
      setCurrentAudio(null);
    } else {
      setCurrentAudio(audioName);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Relax & Wellness Tools
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover personalized tools to support your mental wellness journey. 
          Take a moment to breathe, reflect, and nurture your wellbeing.
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:mx-auto">
          <TabsTrigger value="breathing" className="flex items-center gap-2">
            <Waves className="w-4 h-4" />
            <span className="hidden sm:inline">Breathing</span>
          </TabsTrigger>
          <TabsTrigger value="meditation" className="flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            <span className="hidden sm:inline">Audio</span>
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            <span className="hidden sm:inline">Journal</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Breathing Exercises */}
        <TabsContent value="breathing" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="space-y-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="w-5 h-5 text-wellness-calm" />
                  Guided Breathing
                </CardTitle>
                <CardDescription>
                  Choose a breathing exercise to help you relax and center yourself
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {breathingExercises.map((exercise) => (
                  <div
                    key={exercise.name}
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <span className="text-sm text-muted-foreground">{exercise.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                    <Button
                      onClick={() => startBreathing(exercise.name)}
                      variant="default"
                      size="sm"
                      disabled={breathingActive}
                      className="w-full"
                    >
                      {breathingActive ? "In Progress..." : "Start Exercise"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="space-y-4">
              <CardHeader>
                <CardTitle>Breathing Session</CardTitle>
                <CardDescription>
                  {breathingActive ? "Focus on your breath..." : "Select an exercise to begin"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {breathingActive ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-gradient-wellness rounded-full flex items-center justify-center animate-wellness-pulse">
                        <div className="text-2xl font-bold text-primary-foreground">
                          {Math.ceil((100 - breathingProgress) / 4)}s
                        </div>
                      </div>
                    </div>
                    <Progress value={breathingProgress} className="w-full" />
                    <div className="text-center text-sm text-muted-foreground">
                      Breathe in slowly... hold... breathe out...
                    </div>
                    <Button
                      onClick={() => {
                        setBreathingActive(false);
                        setBreathingProgress(0);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Stop Session
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Waves className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Select a breathing exercise to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Calming Audio */}
        <TabsContent value="meditation" className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {calmingAudios.map((audio) => (
              <Card key={audio.name} className="hover:shadow-gentle transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{audio.name}</h4>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {audio.category}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{audio.duration}</div>
                    <Button
                      onClick={() => toggleAudio(audio.name)}
                      variant={currentAudio === audio.name ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {currentAudio === audio.name ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Playing
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Journal */}
        <TabsContent value="journal" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-wellness-focus" />
                    Daily Journal
                  </CardTitle>
                  <CardDescription>
                    Take a moment to reflect on your thoughts and feelings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Start writing about your day, feelings, or thoughts..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {journalEntry.length} characters
                    </span>
                    <div className="space-x-2">
                      <Button
                        onClick={() => setJournalEntry("")}
                        variant="outline"
                        size="sm"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                      <Button variant="default" size="sm">
                        Save Entry
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Journal Prompts</CardTitle>
                  <CardDescription>
                    Need inspiration? Try one of these prompts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {journalPrompts.map((prompt, index) => (
                    <div
                      key={index}
                      onClick={() => setJournalEntry(prompt + "\n\n")}
                      className="p-3 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/30 transition-colors text-sm"
                    >
                      {prompt}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mood Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-wellness rounded-lg flex items-center justify-center text-muted-foreground">
                  Mood analytics visualization
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wellness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-wellness-balance">78</div>
                  <p className="text-sm text-muted-foreground">Good progress!</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Breathing sessions</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Journal entries</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meditation minutes</span>
                    <span className="font-medium">45</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};