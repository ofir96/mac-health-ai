import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await Promise.resolve(params.id);
    
    const analysis = {
      analysisId: id,
      timestamp: new Date().toISOString(),
      foodItem: {
        name: "apple",
        confidence: 95,
        portion: {
          size: 150,
          unit: "g",
          description: "medium-sized apple"
        }
      },
      nutrition: {
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3
      },
      dailyGoals: {
        calories: {
          current: 95,
          target: 2000
        },
        protein: {
          current: 0.5,
          target: 50
        }
      },
      recommendations: [
        "Great source of dietary fiber.",
        "Helps in maintaining healthy blood sugar levels.",
        "Contains antioxidants that may lower the risk of chronic diseases.",
        "Low in calories, which is beneficial for weight management."
      ],
      analysis: "This apple provides a modest amount of calories, primarily from carbohydrates, making it an excellent choice for a quick energy boost. It is low in protein and fat. As part of a balanced diet, it contributes to daily fiber intake, aids digestion, and supports heart health due to its rich content of vitamins and antioxidants."
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis results' },
      { status: 500 }
    );
  }
} 