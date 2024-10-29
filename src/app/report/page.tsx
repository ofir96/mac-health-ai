'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Share2, AlertCircle, Scale, Check, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface AnalysisResult {
  analysisId: string;
  timestamp: string;
  foodItem: {
    name: string;
    confidence: number;
    portion: {
      size: number;
      unit: string;
      description: string;
    };
  };
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  dailyGoals: {
    calories: {
      current: number;
      target: number;
    };
    protein: {
      current: number;
      target: number;
    };
  };
  recommendations: string[];
  analysis: string;
}

export default function ReportPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('id');
  const status = searchParams.get('status');
  const [loading, setLoading] = useState(status === 'analyzing' || !!analysisId);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function fetchAnalysis() {
      try {
        if (!analysisId && status === 'analyzing') {
          // Poll every 2 seconds while analyzing
          intervalId = setInterval(async () => {
            // Check if analysis is complete
            const response = await fetch('/api/analysis-status');
            const { latestAnalysisId } = await response.json();
            if (latestAnalysisId) {
              clearInterval(intervalId);
              window.location.href = `/report?id=${latestAnalysisId}`;
            }
          }, 2000);
          return;
        }

        if (!analysisId) {
          setError('No analysis ID provided');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/analysis/${analysisId}`);
        if (!response.ok) throw new Error('Failed to fetch analysis');
        
        const data = await response.json();
        setAnalysis(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load analysis results');
        console.error('Analysis fetch error:', err);
        setLoading(false);
      }
    }

    fetchAnalysis();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [analysisId, status]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your meal...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <Card className="p-8 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold text-red-600 mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/camera">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Try Again</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-2xl mx-auto flex justify-between items-center p-4">
          <Link href="/camera">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Food Analysis
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-6 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Food Identification */}
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-900">{analysis?.foodItem.name || 'Unknown Food'}</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {analysis?.foodItem.confidence || 0}% match
              </span>
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <Scale className="h-4 w-4 mr-2 text-gray-400" />
              {analysis?.foodItem.portion.size} {analysis?.foodItem.portion.unit} 
              <span className="mx-2">•</span>
              {analysis?.foodItem.portion.description}
            </div>
          </Card>

          {/* Nutritional Information */}
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Nutritional Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-600 mb-1">Calories</p>
                <p className="text-2xl font-bold text-blue-700">{analysis?.nutrition.calories || 0}
                  <span className="text-sm font-normal ml-1">kcal</span>
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-green-600 mb-1">Protein</p>
                <p className="text-2xl font-bold text-green-700">{analysis?.nutrition.protein || 0}
                  <span className="text-sm font-normal ml-1">g</span>
                </p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-purple-600 mb-1">Carbs</p>
                <p className="text-2xl font-bold text-purple-700">{analysis?.nutrition.carbs || 0}
                  <span className="text-sm font-normal ml-1">g</span>
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-sm text-orange-600 mb-1">Fat</p>
                <p className="text-2xl font-bold text-orange-700">{analysis?.nutrition.fat || 0}
                  <span className="text-sm font-normal ml-1">g</span>
                </p>
              </div>
            </div>
          </Card>

          {/* Daily Goals Progress */}
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Daily Goals Progress</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Calories</span>
                  <span className="text-gray-600">
                    {analysis?.dailyGoals.calories.current || 0} / {analysis?.dailyGoals.calories.target} kcal
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={((analysis?.dailyGoals.calories.current || 0) / analysis?.dailyGoals.calories.target) * 100} 
                    className="h-3 rounded-full bg-blue-100" 
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Protein</span>
                  <span className="text-gray-600">
                    {analysis?.dailyGoals.protein.current || 0} / {analysis?.dailyGoals.protein.target}g
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={((analysis?.dailyGoals.protein.current || 0) / analysis?.dailyGoals.protein.target) * 100} 
                    className="h-3 rounded-full bg-green-100" 
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Recommendations</h3>
            <ul className="space-y-3">
              {analysis?.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-600">{rec}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Detailed Analysis */}
          <Card className="p-6 hover:shadow-lg transition-all duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Detailed Analysis</h3>
            <p className="text-gray-600 leading-relaxed">{analysis?.analysis}</p>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              Save to Log
            </Button>
            <Button variant="outline" className="flex items-center px-6 border-2 hover:bg-gray-50">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-gray-600">
            Analysis powered by OpenAI Vision • Made with{" "}
            <Heart className="h-3 w-3 inline-block text-red-500 animate-pulse" />{" "}
            for healthy living
          </p>
        </div>
      </footer>
    </div>
  );
}

function processAnalysisData(data: any): AnalysisResult {
  // Process the raw analysis text to extract metrics and recommendations
  // This is a placeholder implementation - you'll need to adapt this based on your AI model's output format
  const analysis = data.analysis || '';
  
  // Example parsing logic - adjust based on your AI model's output format
  const metrics = {
    storage: 65,
    memory: 88,
    battery: 95,
    overall: 92,
  };

  const recommendations = [
    'Consider clearing some storage space',
    'Battery is in excellent condition',
    'Memory usage is optimal',
  ];

  return {
    ...data,
    metrics,
    recommendations,
    timestamp: new Date().toISOString(),
  };
} 