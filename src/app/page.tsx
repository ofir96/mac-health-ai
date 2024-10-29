'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Camera, History, Settings, User, Menu, X, Utensils, Heart, Brain, Zap, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* App Bar */}
      <header className="bg-gradient-to-b from-blue-100 to-blue-50 border-b border-blue-200">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
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

            <nav className="hidden md:flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-blue-200 bg-white/80 backdrop-blur-sm">
              <nav className="flex flex-col p-4 space-y-2">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Link href="/history">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-6">
          <div className="inline-block animate-bounce p-4 bg-blue-100 rounded-full mb-6">
            <Camera className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Your Personal
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              {" "}Nutrition Assistant
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Snap a photo of your meal and instantly get detailed nutritional insights powered by AI
          </p>
          <Link href="/camera">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 text-lg h-12 px-8"
            >
              <Camera className="mr-2 h-5 w-5" />
              Analyze Food Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Instant Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Get detailed nutritional information in seconds with our advanced AI technology
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Health Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your daily nutrition goals and maintain a balanced diet effortlessly
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Smart Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive personalized recommendations based on your dietary preferences and goals
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <History className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Progress Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              View your nutrition history and track your progress towards a healthier lifestyle
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Start Your Health Journey Today
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are making informed decisions about their nutrition with AI-powered insights
          </p>
          <Link href="/camera">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-blue-50 to-white py-8 mt-12">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Powered by OpenAI Vision • Made with{" "}
            <Heart className="h-4 w-4 inline-block text-red-500 animate-pulse" />{" "}
            for healthy living
          </p>
        </div>
      </footer>
    </div>
  );
} 