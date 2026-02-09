import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleReview = async () => {
    if (!code.trim()) {
      setOutput("⚠️ Please paste your code before requesting a review.");
      return;
    }

    try {
      setLoading(true);
      setOutput("🔍 Reviewing your code...");

      const response = await axios.post(
        "https://ai-powered-code-reviewer-backend-n6io.onrender.com",
        { code }
      );

      setOutput(response.data.review);
    } catch (error) {
      setOutput("❌ Failed to get AI review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
          <span>AI Code Reviewer</span>
        </div>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>Review Your Code with AI Precision</h1>
        <p>
          Get instant feedback on correctness, logic quality, and optimized
          solutions using AI.
        </p>
      </section>

      {/* Main Card */}
      <div className="card">
        <div className="editor-grid">
          {/* Code Input */}
          <div className="panel">
            <div className="panel-header">🧠 Your Code</div>

            <textarea
              className="editor"
              placeholder="// Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="panel-footer">
              Supports any programming language
            </div>
          </div>

          {/* AI Review */}
          <div className="panel">
            <div className="panel-header">📋 AI Review</div>

            <div className="editor read-only">
              <div className="markdown">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {output || "Your AI code review will appear here..."}
                </ReactMarkdown>
              </div>
            </div>

            <div className="panel-footer">
              {loading
                ? "Analyzing code..."
                : "AI-generated feedback & suggestions"}
            </div>
          </div>
        </div>

        <button
          className="review-btn"
          onClick={handleReview}
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Review My Code"}
        </button>

        <p className="note">
          No login required · Free to use · Instant AI feedback
        </p>
      </div>

      <footer className="footer">
       · Built for Developers | Made with ❤️ by Abhisan ·
      </footer>
    </div>
  );
}

export default App;
