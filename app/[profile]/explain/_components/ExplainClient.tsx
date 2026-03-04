"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DuduMascot from "@/components/DuduMascot";

const PROFILES: Record<string, { name: string; stars: number; streak: number; avatar: string }> = {
  johnny: { name: "Johnny", stars: 142, streak: 5, avatar: "🦁" },
  jasmine: { name: "Jasmine", stars: 89, streak: 3, avatar: "🦋" },
};

const TOPICS = [
  {
    id: "numbers",
    label: "Numbers",
    emoji: "🔢",
    explanation: "Numbers are how we count things! 1 apple, 2 cats, 3 stars ⭐⭐⭐. Numbers help us know HOW MANY of something we have. You can add them together — like 2 + 3 = 5! Isn't that magical? 🎉",
    color: "#7C5CBF",
    light: "#F3EEFF",
    border: "#C9B8FF",
  },
  {
    id: "animals",
    label: "Animals",
    emoji: "🦁",
    explanation: "Animals are living creatures — just like us! 🐘 Some have fur, some have feathers (like me!), and some have scales. They breathe, eat, and take care of their babies. There are millions of amazing animals on Earth! 🌍",
    color: "#2E8B3C",
    light: "#E8FFF0",
    border: "#6BCB77",
  },
  {
    id: "space",
    label: "Space",
    emoji: "🚀",
    explanation: "Space is everything beyond the sky! 🌌 It's HUGE — so big we can't even imagine it. Our Earth floats in space, going around the Sun. There are billions of stars out there, and some might even have planets with life on them! 👽",
    color: "#1A6B9A",
    light: "#E0F4FF",
    border: "#4ECDC4",
  },
  {
    id: "words",
    label: "Words",
    emoji: "📝",
    explanation: "Words are how we share ideas! 💬 Every word is made of letters. When you put words together, you make sentences — and sentences tell stories, give instructions, or share feelings. Words are like magic spells! ✨",
    color: "#D4880C",
    light: "#FFF3D4",
    border: "#FFB830",
  },
];

const DUDU_ECHO_RESPONSES = [
  "Wow, you explained that SO well! I understood everything! 🌟",
  "Amazing job! You're such a great teacher! 🎉",
  "Brilliant! You really DO understand it! ⭐",
  "That was perfect! You should teach ME more! 🐣💕",
  "Incredible explanation! You're a superstar! 🌟✨",
];

type Phase = "select" | "explain" | "echo" | "done";

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

export default function ExplainEchoPage() {
  const params = useParams();
  const profileId = typeof params.profile === "string" ? params.profile : "johnny";
  const profile = PROFILES[profileId] ?? PROFILES.johnny;

  const [phase, setPhase] = useState<Phase>("select");
  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[0] | null>(null);
  const [echoText, setEchoText] = useState("");
  const [isHolding, setIsHolding] = useState(false);
  const [duduReaction, setDuduReaction] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectTopic = (topic: typeof TOPICS[0]) => {
    setSelectedTopic(topic);
    setPhase("explain");
  };

  const handleUnderstand = () => {
    setPhase("echo");
  };

  const submitEcho = (text: string) => {
    if (!text.trim() || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      const reaction = DUDU_ECHO_RESPONSES[Math.floor(Math.random() * DUDU_ECHO_RESPONSES.length)];
      setDuduReaction(reaction);
      setPhase("done");
      setIsProcessing(false);
    }, 1200);
  };

  const reset = () => {
    setPhase("select");
    setSelectedTopic(null);
    setEchoText("");
    setDuduReaction("");
  };

  const bgStyle = selectedTopic
    ? { background: `linear-gradient(160deg, ${selectedTopic.light} 0%, white 100%)` }
    : { background: "linear-gradient(160deg, #E8FFF0 0%, #C8F5D8 100%)" };

  return (
    <main className="star-bg min-h-screen flex flex-col" style={bgStyle}>
      <div
        className="fixed top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: selectedTopic?.color ?? "#6BCB77", filter: "blur(70px)", transform: "translate(30%, -30%)" }}
      />

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-3 animate-pop-in relative z-10">
        <button
          onClick={phase !== "select" ? reset : undefined}
          className="press-effect flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm"
          style={{
            background: "white",
            border: `2px solid ${selectedTopic?.border ?? "#6BCB77"}`,
            color: "#5A5A7A",
            boxShadow: `0 3px 0 ${selectedTopic?.border ?? "#6BCB77"}`,
            cursor: "pointer",
          }}
        >
          {phase !== "select" ? (
            <Link href={`/${profileId}`} style={{ textDecoration: "none", color: "inherit" }}>← Hub</Link>
          ) : (
            <Link href={`/${profileId}`} style={{ textDecoration: "none", color: "inherit" }}>← Hub</Link>
          )}
        </button>

        <div className="text-lg font-black" style={{ color: selectedTopic?.color ?? "#2E8B3C", fontFamily: "var(--font-nunito)" }}>
          🧠 Explain &amp; Echo
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

      <div className="flex-1 flex flex-col px-4 pb-8 relative z-10">

        {/* PHASE: Select */}
        {phase === "select" && (
          <div className="flex flex-col items-center gap-6 mt-4">
            <div className="flex items-end gap-3 w-full animate-slide-up">
              <DuduMascot size={80} animate="bounce" />
              <div
                className="flex-1 px-4 py-3 rounded-2xl rounded-bl-sm font-bold text-sm"
                style={{ background: "white", border: "2px solid #6BCB77", color: "#2D2D2D", boxShadow: "0 4px 0 #6BCB77" }}
              >
                What would you like to learn about today, {profile.avatar} {profile.name}? 🤩
              </div>
            </div>

            <h2 className="text-xl font-black text-center animate-pop-in" style={{ color: "#2D2D2D" }}>
              Pick a topic!
            </h2>

            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {TOPICS.map((topic, i) => (
                <button
                  key={topic.id}
                  onClick={() => selectTopic(topic)}
                  className={`press-effect p-5 rounded-3xl flex flex-col items-center gap-2 font-black animate-pop-in card-${i + 1}`}
                  style={{
                    background: `linear-gradient(145deg, ${topic.light}, white)`,
                    border: `3px solid ${topic.border}`,
                    boxShadow: `0 6px 0 ${topic.border}88`,
                    cursor: "pointer",
                    opacity: 0,
                  }}
                >
                  <span style={{ fontSize: "36px" }}>{topic.emoji}</span>
                  <span style={{ color: topic.color, fontSize: "14px" }}>{topic.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PHASE: Explain */}
        {phase === "explain" && selectedTopic && (
          <div className="flex flex-col items-center gap-5 mt-4">
            <div className="flex items-end gap-3 w-full animate-slide-up">
              <DuduMascot size={90} animate="wiggle" />
              <div
                className="flex-1 px-4 py-3 rounded-2xl rounded-bl-sm font-bold text-sm leading-relaxed"
                style={{
                  background: "white",
                  border: `2px solid ${selectedTopic.border}`,
                  color: "#2D2D2D",
                  boxShadow: `0 4px 0 ${selectedTopic.border}`,
                }}
              >
                {selectedTopic.explanation}
              </div>
            </div>

            <div
              className="w-full text-center py-2 rounded-2xl font-bold text-sm animate-pop-in"
              style={{ background: selectedTopic.light, color: selectedTopic.color, border: `2px solid ${selectedTopic.border}` }}
            >
              {selectedTopic.emoji} Learning about: <strong>{selectedTopic.label}</strong>
            </div>

            <button
              onClick={handleUnderstand}
              className="press-effect w-full py-5 rounded-3xl font-black text-white text-xl animate-pop-in card-2"
              style={{
                background: `linear-gradient(135deg, ${selectedTopic.color}, ${selectedTopic.border})`,
                boxShadow: `0 6px 0 ${selectedTopic.color}88`,
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              I understand! ✅
            </button>
          </div>
        )}

        {/* PHASE: Echo */}
        {phase === "echo" && selectedTopic && (
          <div className="flex flex-col items-center gap-5 mt-4">
            <div className="flex items-end gap-3 w-full animate-slide-up">
              <DuduMascot size={80} animate="bounce" />
              <div
                className="flex-1 px-4 py-3 rounded-2xl rounded-bl-sm font-bold text-sm"
                style={{ background: "white", border: `2px solid ${selectedTopic.border}`, color: "#2D2D2D", boxShadow: `0 4px 0 ${selectedTopic.border}` }}
              >
                Amazing! Now explain it back to me in YOUR words! I can&apos;t wait to hear! 🎤
              </div>
            </div>

            <button
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onTouchStart={() => setIsHolding(true)}
              onTouchEnd={() => setIsHolding(false)}
              className="rounded-full flex items-center justify-center animate-pop-in"
              style={{
                width: 100,
                height: 100,
                background: isHolding
                  ? "linear-gradient(135deg, #FF6B6B, #FF8F00)"
                  : `linear-gradient(135deg, ${selectedTopic.color}, ${selectedTopic.border})`,
                boxShadow: isHolding
                  ? "0 3px 0 #CC4040"
                  : `0 7px 0 ${selectedTopic.color}88`,
                transform: isHolding ? "scale(0.94) translateY(4px)" : "scale(1)",
                transition: "all 0.1s ease",
                fontSize: "36px",
                border: "none",
                cursor: "pointer",
                opacity: 0,
              }}
            >
              🎤
            </button>
            <p className="font-bold text-sm" style={{ color: selectedTopic.color }}>
              {isHolding ? "Listening... 🎙️" : "Hold to Talk"}
            </p>

            <div className="flex gap-2 w-full max-w-sm">
              <input
                type="text"
                value={echoText}
                onChange={(e) => setEchoText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitEcho(echoText)}
                placeholder="Or type your explanation..."
                className="flex-1 px-4 py-3 rounded-2xl font-semibold text-sm outline-none"
                style={{ background: "white", border: `2px solid ${selectedTopic.border}`, color: "#2D2D2D", boxShadow: `0 3px 0 ${selectedTopic.border}` }}
              />
              <button
                onClick={() => submitEcho(echoText)}
                disabled={!echoText.trim() || isProcessing}
                className="press-effect px-4 py-3 rounded-2xl font-black text-white text-sm"
                style={{
                  background: echoText.trim() && !isProcessing ? selectedTopic.color : "#D0D0D0",
                  boxShadow: echoText.trim() && !isProcessing ? `0 4px 0 ${selectedTopic.color}88` : "0 4px 0 #B0B0B0",
                  border: "none",
                  cursor: echoText.trim() && !isProcessing ? "pointer" : "not-allowed",
                }}
              >
                Done!
              </button>
            </div>
          </div>
        )}

        {/* PHASE: Done */}
        {phase === "done" && selectedTopic && (
          <div className="flex flex-col items-center gap-5 mt-4">
            <div className="animate-pop-in text-center">
              <DuduMascot size={110} animate="wiggle" />
            </div>

            <div
              className="w-full px-5 py-5 rounded-3xl text-center animate-pop-in card-2"
              style={{
                background: "white",
                border: `3px solid ${selectedTopic.border}`,
                boxShadow: `0 6px 0 ${selectedTopic.border}88`,
                opacity: 0,
              }}
            >
              <div style={{ fontSize: "48px" }}>🎉</div>
              <h2 className="font-black text-xl mt-2 mb-1" style={{ color: selectedTopic.color }}>
                Fantastic!
              </h2>
              <p className="font-bold text-sm" style={{ color: "#2D2D2D" }}>
                {duduReaction}
              </p>
            </div>

            <div className="flex gap-3 w-full animate-pop-in card-3" style={{ opacity: 0 }}>
              <button
                onClick={reset}
                className="press-effect flex-1 py-4 rounded-2xl font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${selectedTopic.color}, ${selectedTopic.border})`,
                  boxShadow: `0 5px 0 ${selectedTopic.color}88`,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Learn more! 🧠
              </button>
              <Link
                href={`/${profileId}`}
                className="press-effect flex-1 py-4 rounded-2xl font-black text-center"
                style={{
                  background: "white",
                  border: `2px solid ${selectedTopic.border}`,
                  color: selectedTopic.color,
                  boxShadow: `0 5px 0 ${selectedTopic.border}`,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Back to Hub 🏠
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
