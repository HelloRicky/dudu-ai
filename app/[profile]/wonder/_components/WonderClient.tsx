"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DuduMascot from "@/components/DuduMascot";

interface Message {
  id: number;
  role: "user" | "dudu";
  text: string;
}

const PROFILES: Record<string, { name: string; stars: number; streak: number; avatar: string }> = {
  johnny: { name: "Johnny", stars: 142, streak: 5, avatar: "🦁" },
  jasmine: { name: "Jasmine", stars: 89, streak: 3, avatar: "🦋" },
};

const DUDU_RESPONSES = [
  "That's a great question! Let me think... 🤔",
  "Ooh, I love that question! You're so curious! ✨",
  "Wow, that made me think really hard! 🧠💭",
  "Great wondering! The world is full of amazing things! 🌍",
  "You know what? That question is SO interesting! 🌟",
  "Hmm, let me flap my wings and think about that... 🐣",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block">
      <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    </svg>
  );
}

export default function WonderModePage() {
  const params = useParams();
  const profileId = typeof params.profile === "string" ? params.profile : "johnny";
  const profile = PROFILES[profileId] ?? PROFILES.johnny;

  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "dudu", text: "Hi! I'm Dudu! 🐣 Ask me anything you're curious about!" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isThinking) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsThinking(true);

    setTimeout(() => {
      const response = DUDU_RESPONSES[Math.floor(Math.random() * DUDU_RESPONSES.length)];
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "dudu", text: response }]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <main
      className="star-bg min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #F3EEFF 0%, #E0D4FF 100%)" }}
    >
      <div
        className="fixed top-0 right-0 w-64 h-64 rounded-full opacity-30 pointer-events-none"
        style={{ background: "#C9B8FF", filter: "blur(70px)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#7C5CBF", filter: "blur(80px)", transform: "translate(-30%, 30%)" }}
      />

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-3 animate-pop-in relative z-10">
        <Link
          href={`/${profileId}`}
          className="press-effect flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm"
          style={{
            background: "white",
            border: "2px solid #C9B8FF",
            color: "#5A5A7A",
            boxShadow: "0 3px 0 #C9B8FF",
            textDecoration: "none",
          }}
        >
          ← Hub
        </Link>

        <div className="text-lg font-black" style={{ color: "#7C5CBF", fontFamily: "var(--font-nunito)" }}>
          🔮 Wonder Mode
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 px-3 py-2 rounded-2xl font-bold text-sm"
            style={{ background: "white", color: "#FF8F00", border: "2px solid #FFD580", boxShadow: "0 3px 0 #FFD580" }}
          >
            <StarIcon /><span className="ml-1">{profile.stars}</span>
          </div>
          <div
            className="flex items-center gap-1 px-3 py-2 rounded-2xl font-bold text-sm"
            style={{ background: "white", color: "#FF6B6B", border: "2px solid #FFB8B8", boxShadow: "0 3px 0 #FFB8B8" }}
          >
            <FireIcon /><span className="ml-1">{profile.streak}</span>
          </div>
        </div>
      </header>

      {/* Dudu + speech bubble */}
      <div className="flex items-end gap-3 px-5 pb-2 animate-slide-up relative z-10">
        <DuduMascot size={70} animate="float" />
        <div
          className="relative px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm font-bold flex-1"
          style={{ background: "white", border: "2px solid #C9B8FF", color: "#2D2D2D", boxShadow: "0 4px 0 #C9B8FF" }}
        >
          Ask me anything, {profile.avatar} {profile.name}! I love your questions! 🌟
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3 relative z-10">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex animate-pop-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "dudu" && <div className="mr-2 flex-shrink-0 self-end text-xl">🐣</div>}
            <div
              className="max-w-xs px-4 py-3 rounded-3xl font-bold text-sm leading-relaxed"
              style={
                msg.role === "user"
                  ? { background: "linear-gradient(135deg, #7C5CBF, #9B7FD4)", color: "white", borderBottomRightRadius: "6px", boxShadow: "0 4px 12px rgba(124,92,191,0.3)" }
                  : { background: "white", color: "#2D2D2D", border: "2px solid #E0D4FF", borderBottomLeftRadius: "6px", boxShadow: "0 4px 0 #E0D4FF" }
              }
            >
              {msg.text}
            </div>
            {msg.role === "user" && <div className="ml-2 flex-shrink-0 self-end text-xl">{profile.avatar}</div>}
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start animate-pop-in">
            <div className="mr-2 flex-shrink-0 self-end text-xl">🐣</div>
            <div
              className="px-5 py-3 rounded-3xl font-bold text-sm"
              style={{ background: "white", border: "2px solid #E0D4FF", boxShadow: "0 4px 0 #E0D4FF", color: "#7C5CBF" }}
            >
              <span>thinking</span>
              <span style={{ display: "inline-block", animation: "sparkle 0.6s ease-in-out infinite" }}>.</span>
              <span style={{ display: "inline-block", animation: "sparkle 0.6s ease-in-out 0.2s infinite" }}>.</span>
              <span style={{ display: "inline-block", animation: "sparkle 0.6s ease-in-out 0.4s infinite" }}>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="px-4 pb-8 pt-3 flex flex-col items-center gap-4 relative z-10"
        style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", borderTop: "2px solid #E0D4FF" }}
      >
        <button
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className="rounded-full flex items-center justify-center font-black text-white"
          style={{
            width: 88,
            height: 88,
            background: isHolding
              ? "linear-gradient(135deg, #FF6B6B, #FF8F00)"
              : "linear-gradient(135deg, #7C5CBF, #4ECDC4)",
            boxShadow: isHolding
              ? "0 2px 0 #CC4040, 0 6px 16px rgba(255,107,107,0.4)"
              : "0 6px 0 #5A3FA0, 0 10px 20px rgba(124,92,191,0.3)",
            transform: isHolding ? "scale(0.94) translateY(4px)" : "scale(1)",
            transition: "all 0.1s ease",
            fontSize: "28px",
            cursor: "pointer",
            border: "none",
          }}
        >
          🎤
        </button>
        <p className="text-xs font-bold -mt-2" style={{ color: "#7C5CBF" }}>
          {isHolding ? "Listening... 🎙️" : "Hold to Talk"}
        </p>

        <div className="flex gap-2 w-full max-w-sm">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(inputText)}
            placeholder="Or type here..."
            className="flex-1 px-4 py-3 rounded-2xl font-semibold text-sm outline-none"
            style={{ background: "white", border: "2px solid #C9B8FF", color: "#2D2D2D", boxShadow: "0 3px 0 #C9B8FF" }}
          />
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isThinking}
            className="press-effect px-5 py-3 rounded-2xl font-black text-white text-sm"
            style={{
              background: inputText.trim() && !isThinking ? "linear-gradient(135deg, #7C5CBF, #9B7FD4)" : "#D0D0D0",
              boxShadow: inputText.trim() && !isThinking ? "0 4px 0 #5A3FA0" : "0 4px 0 #B0B0B0",
              border: "none",
              cursor: inputText.trim() && !isThinking ? "pointer" : "not-allowed",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
