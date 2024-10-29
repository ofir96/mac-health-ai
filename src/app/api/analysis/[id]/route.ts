import { NextRequest, NextResponse } from "next/server";

interface Analysis {
  id: string;
  timestamp: string;
  results: {
    summary: string;
    patterns: string[];
    recommendations?: string[];
  };
}

const analysisStore: { [key: string]: Analysis } = {};

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;

    // Check if analysis exists in our temporary store
    const analysis = analysisStore[id];

    if (!analysis) {
      return NextResponse.json(
        { error: "Analysis not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return NextResponse.json(
      { error: "Failed to fetch analysis results" },
      { status: 500 }
    );
  }
}

// Add a method to store analysis results
export function storeAnalysis(id: string, data: Analysis) {
  analysisStore[id] = data;
}
