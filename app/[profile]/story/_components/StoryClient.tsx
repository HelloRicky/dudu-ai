"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DuduMascot from "@/components/DuduMascot";

const PROFILES: Record<string, { name: string; stars: number; streak: number; avatar: string }> = {
  johnny: { name: "Johnny", stars: 142, streak: 5, avatar: "🦁" },
  jasmine: { name: "Jasmine", stars: 89, streak: 3, avatar: "🦋" },
};

interface StoryEntry {
  id: number;
  role: "dudu" | "user";
  text: string;
}

const DUDU_CONTINUATIONS = [
  "Suddenly, a magical rainbow appeared in the sky! 🌈",
  "Just then, a friendly dragon swooped down to help! 🐉",
  "Deep in the forest, they discovered a tiny glowing door! ✨",
  "The wind whispered a secret that changed everything! 🌬️",
  "And then they found a map leading to the greatest treasure! 🗺️",
  "A talking cloud floated by and offered to carry them! ☁️",
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

export default function StoryBuilderPage() {
  const params = useParams();
  const profileId = typeof params.profile === "string" ? params.profile : "johnny";
  const profile = PROFILES[profileId] ?? PROFILES.johnny;

  const [entries, setEntries] = useState<StoryEntry[]>([
    { id: 0, role: "dudu", text: "Once upon a time, in a land where clouds were made of cotton candy... 🍭" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isDuduThinking, setIsDuduThinking] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isUserTurn = entries[entries.length - 1]?.role === "dudu" && !isDuduThinking;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, isDuduThinking]);

  const addUserSentence = (text: string) => {
    if (!text.trim() || !isUserTurn) return;
    const userEntry: StoryEntry = { id: Date.now(), role: "user", text: text.trim() };
    setEntries((prev) => [...prev, userEntry]);
    setInputText("");
    setIsDuduThinking(true);

    setTimeout(() => {
      const continuation = DUDU_CONTINUATIONS[Math.floor(Math.random() * DUDU_CONTINUATIONS.length)];
      setEntries((prev) => [...prev, { id: Date.now() + 1, role: "dudu", text: continuation }]);
      setIsDuduThinking(false);
    }, 1500);
  };

  return (
    <main
      className="star-bg min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #FFF3D4 0%, #FFE4A0 100%)" }}
    >
      <div
        className="fixed top-0 right-0 w-64 h-64 rounded-full opacity-30 pointer-events-none"
        style={{ background: "#FFB830", filter: "blur(70px)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#FF8F00", filter: "blur(80px)", transform: "translate(-30%, 30%)" }}
      />

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-3 animate-pop-in relative z-10">
        <Link
          href={`/${profileId}`}
          className="press-effect flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm"
          style={{ background: "white", border: "2px solid #FFB830", color: "#5A5A7A", boxShadow: "0 3px 0 #FFB830", textDecoration: "none" }}
        >
          ← Hub
        </Link>

        <div className="text-lg font-black" style={{ color: "#D4880C", fontFamily: "var(--font-nunito)" }}>
          📖 Story Builder
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-2 rounded-2xl font-bold text-sm"
            style={{ background: "white", color: "#FF8F00", border: "2px solid #FFD580", boxShadow: "0 3px 0 #FFD580" }}>
            <StarIcon /><span className="ml-1">{profile.stars}</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-2 rounded-2xl font-bold text-sm"
            style={{ background: "white", color: "#FF6B6B", border: "2px solid #FFB8B8", boxShadow: "0 3px 0 #FFB8B8" }}>
            <FireIcon /><span className="ml-1">{profile.streak}</span>
          </div>
        </div>
      </header>

      {/* Story display */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 relative z-10">
        {/* Book header */}
        <div
          className="text-center py-3 rounded-2xl font-black text-lg animate-pop-in"
          style={{ background: "linear-gradient(135deg, #FFB830, #FF8F00)", color: "white", boxShadow: "0 4px 0 #D4880C" }}
        >
          📖 Our Story
        </div>

        {entries.map((entry, idx) => (
          <div key={entry.id} className="animate-pop-in">
            {/* Turn label */}
            <div
              className="text-xs font-extrabold mb-1.5 flex items-center gap-1"
              style={{ color: entry.role === "dudu" ? "#D4880C" : "#7C5CBF" }}
            >
              {entry.role === "dudu" ? (
                <><span>🐣</span><span>Dudu&apos;s turn</span></>
              ) : (
                <><span>{profile.avatar}</span><span>{profile.name}&apos;s turn</span></>
              )}
            </div>

            <div
              className="p-4 rounded-2xl rounded-tl-sm font-bold text-sm leading-relaxed"
              style={
                entry.role === "dudu"
                  ? { background: "white", border: "2px solid #FFD580", color: "#2D2D2D", boxShadow: "0 4px 0 #FFD580" }
                  : { background: "linear-gradient(135deg, #7C5CBF22, #C9B8FF44)", border: "2px solid #C9B8FF", color: "#2D2D2D", boxShadow: "0 4px 0 #C9B8FF" }
              }
            >
              {entry.text}
            </div>

            {/* Connector line for all but last */}
            {idx < entries.length - 1 && (
              <div className="flex justify-center my-1">
                <div style={{ width: 2, height: 16, background: "#FFD580", borderRadius: 2 }} />
              </div>
            )}
          </div>
        ))}

        {isDuduThinking && (
          <div className="animate-pop-in">
            <div className="text-xs font-extrabold mb-1.5 flex items-center gap-1" style={{ color: "#D4880C" }}>
              <span>🐣</span><span>Dudu&apos;s turn</span>
            </div>
            <div
              className="p-4 rounded-2xl font-bold text-sm"
              style={{ background: "white", border: "2px solid #FFD580", color: "#D4880C", boxShadow: "0 4px 0 #FFD580" }}
            >
              Dudu is adding to the story
              <span style={{ display: "inline-block", animation: "sparkle 0.6s ease-in-out infinite" }}>.</span>
              <span style={{ display: "inline-block", animation: "sparkle 0.6s ease-in-out 0.2s infinite" }}>.</span>
              <span style={{ display: "inline-block", animation: "sparkle 0.6s ease-in-out 0.4s infinite" }}>.</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        className="px-4 pb-8 pt-3 relative z-10"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", borderTop: "2px solid #FFD580" }}
      >
        {isUserTurn ? (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-full text-center py-2 px-4 rounded-2xl font-black text-sm"
              style={{ background: "linear-gradient(135deg, #7C5CBF22, #C9B8FF44)", border: "2px solid #C9B8FF", color: "#7C5CBF" }}
            >
              {profile.avatar} It&apos;s YOUR turn! Add a sentence to the story!
            </div>

            <button
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              className="rounded-full flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                background: isHolding ? "linear-gradient(135deg, #FF6B6B, #FF8F00)" : "linear-gradient(135deg, #7C5CBF, #4ECDC4)",
                boxShadow: isHolding ? "0 2px 0 #CC4040" : "0 5px 0 #5A3FA0",
                transform: isHolding ? "scale(0.94) translateY(3px)" : "scale(1)",
                transition: "all 0.1s ease",
                fontSize: "24px",
                border: "none",
                cursor: "pointer",
              }}
            >
              🎤
            </button>

            <div className="flex gap-2 w-full max-w-sm">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addUserSentence(inputText)}
                placeholder="Add your sentence..."
                className="flex-1 px-4 py-3 rounded-2xl font-semibold text-sm outline-none"
                style={{ background: "white", border: "2px solid #FFB830", color: "#2D2D2D", boxShadow: "0 3px 0 #FFB830" }}
              />
              <button
                onClick={() => addUserSentence(inputText)}
                disabled={!inputText.trim()}
                className="press-effect px-4 py-3 rounded-2xl font-black text-white text-sm"
                style={{
                  background: inputText.trim() ? "linear-gradient(135deg, #FFB830, #FF8F00)" : "#D0D0D0",
                  boxShadow: inputText.trim() ? "0 4px 0 #D4880C" : "0 4px 0 #B0B0B0",
                  border: "none",
                  cursor: inputText.trim() ? "pointer" : "not-allowed",
                }}
              >
                Add ✍️
              </button>
            </div>
          </div>
        ) : (
          <div
            className="text-center py-4 px-4 rounded-2xl font-black text-sm"
            style={{ background: "linear-gradient(135deg, #FFB83022, #FF8F0022)", border: "2px solid #FFD580", color: "#D4880C" }}
          >
            🐣 Dudu is thinking of the next part...
          </div>
        )}
      </div>
    </main>
  );
}
