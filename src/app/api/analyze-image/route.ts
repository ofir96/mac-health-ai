import { NextResponse } from "next/server";
import OpenAI from "openai";

// Get API key from environment variable
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

interface NutritionalAnalysis {
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

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, "");

    console.log("Starting food analysis...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a professional nutritionist AI that analyzes food images. Provide detailed nutritional analysis including accurate portion sizes, caloric content, and macronutrients. Focus on providing practical health recommendations based on the food's nutritional content.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this food image in detail and provide a structured response. Consider:
              1. Identify the food items with confidence level
              2. Estimate portion sizes accurately
              3. Calculate nutritional values based on standard databases
              4. Provide specific health recommendations

              Return the analysis in this exact JSON structure:
              {
                "foodItem": {
                  "name": "detailed food name",
                  "confidence": "confidence percentage (1-100)",
                  "portion": {
                    "size": "numerical size",
                    "unit": "measurement unit (g, ml, etc)",
                    "description": "detailed portion description"
                  }
                },
                "nutrition": {
                  "calories": "total calories",
                  "protein": "protein in grams",
                  "carbs": "carbs in grams",
                  "fat": "fat in grams"
                },
                "dailyGoals": {
                  "calories": {
                    "current": "calories from this meal",
                    "target": 2000
                  },
                  "protein": {
                    "current": "protein from this meal",
                    "target": 50
                  }
                },
                "recommendations": [
                  "3-4 specific health recommendations based on this meal"
                ],
                "analysis": "detailed nutritional analysis and health implications"
              }`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const analysisId = Date.now().toString();
    const content = response.choices[0].message.content || "{}";

    console.log("AI Response:", content); // Log the AI response

    const analysisResult = JSON.parse(content) as NutritionalAnalysis;

    const storedAnalysis = {
      analysisId,
      timestamp: new Date().toISOString(),
      ...analysisResult,
    };

    return NextResponse.json(storedAnalysis);
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
