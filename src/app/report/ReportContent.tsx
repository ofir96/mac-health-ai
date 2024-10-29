'use client'

import { useSearchParams } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from 'react'
import { Utensils, Leaf, Target, Brain, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodAnalysis {
  foodItem: {
    name: string;
    confidence: number;
    portion: {
      size: number;
      unit: string;
      description: string;
    }
  };
  nutrition: NutritionData;
  dailyGoals: {
    calories: { current: number; target: number };
    protein: { current: number; target: number };
  };
  recommendations: string[];
  analysis: string;
}

export default function ReportContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null)

  useEffect(() => {
    const data = searchParams.get('data')
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data))
        setAnalysis(parsedData)
      } catch (error) {
        console.error('Failed to parse analysis data:', error)
      }
    }
  }, [searchParams])

  if (status === 'analyzing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-6xl mx-auto p-6 pt-12">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-blue-600 hover:text-blue-800 hover:bg-blue-100">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center space-y-6">
            <Utensils className="h-16 w-16 text-blue-600 mx-auto animate-spin" />
            <h1 className="text-3xl font-bold text-blue-800">
              Analyzing Your Food
            </h1>
            <Progress value={66} className="w-full max-w-md mx-auto h-2 bg-blue-100" />
            <p className="text-lg text-blue-600 font-medium">
              Please wait while our AI analyzes your food...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="container max-w-6xl mx-auto p-6">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-blue-600 hover:text-blue-800 hover:bg-blue-100">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-800">No Analysis Available</h1>
            <p className="text-red-600">Please try analyzing your food again</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-blue-100 to-blue-50 pb-12">
        <div className="container max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <span>Analysis</span>
              <ChevronRight className="h-4 w-4" />
              <span>Results</span>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                <Utensils className="h-10 w-10 text-blue-600" />
                Food Analysis Report
              </h1>
              <p className="text-xl text-blue-700">
                Detailed nutritional breakdown and recommendations
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">Analysis Date</p>
              <p className="text-lg font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto p-6 -mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Food Item Section */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
                Identified Food
              </h2>
              <div className="pl-10">
                <p className="text-3xl font-semibold text-gray-900 mb-2">
                  {analysis.foodItem.name}
                </p>
                <div className="flex items-center gap-3 text-lg">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {(analysis.foodItem.confidence * 100).toFixed(1)}% confidence
                  </span>
                  <span className="text-gray-600">
                    {analysis.foodItem.portion.description}
                  </span>
                </div>
              </div>
            </section>

            {/* Nutrition Facts Section */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nutrition Facts</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <p className="text-4xl font-bold text-blue-800 mb-1">{analysis.nutrition.calories}</p>
                  <p className="text-blue-600 font-medium">Calories</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <p className="text-4xl font-bold text-green-800 mb-1">{analysis.nutrition.protein}g</p>
                  <p className="text-green-600 font-medium">Protein</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                  <p className="text-4xl font-bold text-yellow-800 mb-1">{analysis.nutrition.carbs}g</p>
                  <p className="text-yellow-600 font-medium">Carbs</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <p className="text-4xl font-bold text-purple-800 mb-1">{analysis.nutrition.fat}g</p>
                  <p className="text-purple-600 font-medium">Fat</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Daily Goals Section */}
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-blue-600" />
                Daily Goals
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-gray-700">Calories</p>
                    <p className="font-medium text-blue-600">
                      {analysis.dailyGoals.calories.current}/{analysis.dailyGoals.calories.target}
                    </p>
                  </div>
                  <Progress 
                    value={(analysis.dailyGoals.calories.current / analysis.dailyGoals.calories.target) * 100} 
                    className="h-3 bg-blue-100"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-gray-700">Protein</p>
                    <p className="font-medium text-green-600">
                      {analysis.dailyGoals.protein.current}/{analysis.dailyGoals.protein.target}g
                    </p>
                  </div>
                  <Progress 
                    value={(analysis.dailyGoals.protein.current / analysis.dailyGoals.protein.target) * 100} 
                    className="h-3 bg-green-100"
                  />
                </div>
              </div>
            </section>

            {/* Recommendations Section */}
            <section className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
                AI Recommendations
              </h2>
              <ul className="space-y-3">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <ArrowRight className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Analysis Section - Full Width */}
        <section className="bg-white rounded-xl p-8 shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Detailed Analysis</h2>
          <p className="text-lg text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-200">
            {analysis.analysis}
          </p>
        </section>
      </div>
    </div>
  )
} 