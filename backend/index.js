import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/review-code", async (req, res) => {
  try {
    const { code } = req.body;
    console.log("📩 Code received");

    const chat = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert software code reviewer. Be clear, structured, and concise.",
        },
        {
          role: "user",
          content: `
Review the following code and respond with:
1. Is the code correct?
2. Logic quality
3. Improvements
4. Correct code if wrong

Code:
${code}
`,
        },
      ],
    });

    const aiText = chat.choices[0].message.content;

    console.log("✅ Groq response generated");
    res.json({ review: aiText });
  } catch (error) {
    console.error("❌ Groq error:", error);
    res.status(500).json({ error: "AI review failed" });
  }
});


app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
