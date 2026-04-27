import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  const { source } = await request.json();

  const prompt = `You are a conversion copywriter for Focusly, a student productivity app.
A visitor just landed on the page from: ${source}.
Write personalised marketing copy in this exact JSON format:
{
  "headline": "a compelling headline under 10 words",
  "subheadline": "a supporting sentence under 20 words",
  "cta": "a call to action button text under 5 words"
}
Return only the JSON. No explanation. No markdown.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
  });

  const text = completion.choices[0].message.content;
  const json = JSON.parse(text);

  return Response.json(json);
}