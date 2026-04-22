import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.KIMI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Kimi API Key not found. Please add KIMI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.moonshot.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "moonshot-v1-8k",
        messages: [
          {
            role: "system",
            content: "أنت مساعد ذكي متخصص في كتابة وتحسين الملاحظات الشخصية باللغة العربية. اجعل الملاحظات منظمة، واضحة، ومفيدة.",
          },
          {
            role: "user",
            content: `قم بكتابة ملاحظة مفصلة بناءً على هذا العنوان أو الفكرة: ${prompt}`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Kimi API Error:", data);
      return NextResponse.json({ error: data.error?.message || "Failed to generate note" }, { status: response.status });
    }

    const aiContent = data.choices[0].message.content;
    return NextResponse.json({ content: aiContent });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
