import { NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

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
            "You are a professional nutritionist AI that analyzes food images and returns responses in JSON format. Provide detailed nutritional analysis including accurate portion sizes, caloric content, and macronutrients.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this food image and return a JSON response with the following structure:
              {
                "foodItem": {
                  "name": string,
                  "confidence": number,
                  "portion": {
                    "size": number,
                    "unit": string,
                    "description": string
                  }
                },
                "nutrition": {
                  "calories": number,
                  "protein": number,
                  "carbs": number,
                  "fat": number
                },
                "dailyGoals": {
                  "calories": {
                    "current": number,
                    "target": 2000
                  },
                  "protein": {
                    "current": number,
                    "target": 50
                  }
                },
                "recommendations": string[],
                "analysis": string
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

    const analysisResult = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
