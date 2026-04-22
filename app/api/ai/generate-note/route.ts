import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API Key not found. Please add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    // Google Gemini API endpoint
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `أنت مساعد ذكي متخصص في كتابة وتحسين الملاحظات الشخصية باللغة العربية. اجعل الملاحظات منظمة، واضحة، ومفيدة. قم بكتابة ملاحظة مفصلة بناءً على هذا العنوان أو الفكرة: ${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to generate note" },
        { status: response.status }
      );
    }

    // Extract text from Gemini response structure
    const aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiContent) {
      return NextResponse.json({ error: "No content generated" }, { status: 500 });
    }

    return NextResponse.json({ content: aiContent });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
