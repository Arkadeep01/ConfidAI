import { Button } from "./ui/button";
import { Heart, Shield, Mic, BarChart3, Sparkles } from "lucide-react";

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const features = [
    {
      icon: Heart,
      title: "Wellness Companion",
      description: "AI-powered mental health support available 24/7"
    },
    {
      icon: Shield,
      title: "Stigma Shield",
      description: "Private mode that disguises as productivity app"
    },
    {
      icon: Mic,
      title: "Voice Support",
      description: "Multilingual voice interaction in 7+ languages"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track mood trends and wellness progress"
    }
  ];

  return (
    <div className="relative min-h-screen pt-16 bg-gradient-calm overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-gentle-bounce"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-secondary/10 rounded-full animate-float"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Mental Wellness Reimagined
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Confidential
              </span>{" "}
              AI Wellness{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Companion
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Experience personalized mental health support with complete privacy. 
              ConfidAI provides 24/7 multilingual assistance, mood tracking, and 
              wellness tools designed for your comfort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onGetStarted}
                variant="default" 
                size="lg" 
                className="text-lg px-8 py-6 shadow-wellness hover:shadow-floating transition-all duration-300"
              >
                Start Your Wellness Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/5"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6 animate-slide-in-right">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 p-6 bg-card rounded-2xl shadow-gentle hover:shadow-wellness transition-all duration-300 border border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-20">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            className="fill-background"
          />
        </svg>
      </div>
    </div>
  );
};