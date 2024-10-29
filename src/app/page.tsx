'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Camera, History, Settings, User, Menu, X, Utensils, Heart, Brain, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* App Bar - Made more compact */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center p-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              NutriLens
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-blue-50">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link href="/history">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-blue-50">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-blue-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>

        {/* Mobile Menu - Made more compact */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 animate-in slide-in-from-top">
            <nav className="flex flex-col p-2 bg-white/80 backdrop-blur-sm">
              <Link href="/profile" className="py-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link href="/history" className="py-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
              </Link>
              <Link href="/settings" className="py-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content - Made more compact and centered */}
      <main className="flex-1 px-4 pt-20 w-full">
        {/* Hero Section */}
        <section className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block animate-bounce mb-6">
            <Camera className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Your Personal
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              {" "}Nutrition Assistant
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Snap a photo of your meal and instantly get detailed nutritional insights powered by AI
          </p>
          <Link href="/camera" className="inline-block">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                <Camera className="mr-2 h-5 w-5" />
                Analyze Food Now
              </span>
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-200"></div>
            </Button>
          </Link>
        </section>

        {/* Features Grid - Made more compact */}
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4 mb-12">
          <Card className="p-5 hover:shadow-xl transition-all duration-200 border hover:border-blue-100 group">
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold mb-2">Instant Analysis</h3>
            <p className="text-sm text-gray-600">
              Get detailed nutritional information in seconds with our advanced AI technology
            </p>
          </Card>

          <Card className="p-5 hover:shadow-xl transition-all duration-200 border hover:border-green-100 group">
            <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Heart className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-base font-semibold mb-2">Health Tracking</h3>
            <p className="text-sm text-gray-600">
              Monitor your daily nutrition goals and maintain a balanced diet effortlessly
            </p>
          </Card>

          <Card className="p-5 hover:shadow-xl transition-all duration-200 border hover:border-purple-100 group">
            <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-base font-semibold mb-2">Smart Insights</h3>
            <p className="text-sm text-gray-600">
              Receive personalized recommendations based on your dietary preferences and goals
            </p>
          </Card>

          <Card className="p-5 hover:shadow-xl transition-all duration-200 border hover:border-orange-100 group">
            <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <History className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-base font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-600">
              View your nutrition history and track your progress towards a healthier lifestyle
            </p>
          </Card>
        </div>

        {/* CTA Section - Made more compact */}
        <section className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center shadow-lg mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Start Your Health Journey Today
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 max-w-lg mx-auto">
            Join thousands of users who are making informed decisions about their nutrition with AI-powered insights
          </p>
          <Link href="/camera">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started Now
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer - Made more compact */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Powered by OpenAI Vision • Made with{" "}
            <Heart className="h-3 w-3 inline-block text-red-500 animate-pulse" />{" "}
            for healthy living
          </p>
        </div>
      </footer>
    </div>
  );
} 