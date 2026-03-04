import Link from "next/link";
import DuduMascot from "@/components/DuduMascot";

interface ProfileData {
  name: string;
  stars: number;
  streak: number;
  avatar: string;
}

const PROFILES: Record<string, ProfileData> = {
  johnny: { name: "Johnny", stars: 142, streak: 5, avatar: "🦁" },
  jasmine: { name: "Jasmine", stars: 89, streak: 3, avatar: "🦋" },
};

const MODES = [
  {
    id: "wonder",
    emoji: "🔮",
    title: "Wonder Mode",
    subtitle: "Ask Dudu anything!",
    description: "Curious about the world? Ask Dudu your biggest questions!",
    bgFrom: "#F3EEFF",
    bgTo: "#E0D4FF",
    border: "#C9B8FF",
    badge: "#7C5CBF",
    comingSoon: false,
  },
  {
    id: "story",
    emoji: "📖",
    title: "Story Builder",
    subtitle: "Create stories with Dudu",
    description: "Let your imagination fly! Build magical stories together.",
    bgFrom: "#FFF3D4",
    bgTo: "#FFE4A0",
    border: "#FFB830",
    badge: "#D4880C",
    comingSoon: false,
  },
  {
    id: "explain",
    emoji: "🧠",
    title: "Explain & Echo",
    subtitle: "Learn and teach back",
    description: "Learn something new, then teach it to Dudu!",
    bgFrom: "#E8FFF0",
    bgTo: "#C8F5D8",
    border: "#6BCB77",
    badge: "#2E8B3C",
    comingSoon: false,
  },
  {
    id: "quest",
    emoji: "🎯",
    title: "Quick Quest",
    subtitle: "Coming soon!",
    description: "Epic challenges are being prepared. Stay tuned!",
    bgFrom: "#F5F5F5",
    bgTo: "#EBEBEB",
    border: "#D0D0D0",
    badge: "#999",
    comingSoon: true,
  },
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

export async function generateStaticParams() {
  return [{ profile: "johnny" }, { profile: "jasmine" }];
}

type PageParams = { profile: string };

export default async function LearningHubPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { profile: profileId } = await params;
  const profile = PROFILES[profileId] ?? PROFILES.johnny;

  return (
    <main
      className="star-bg min-h-screen flex flex-col px-4 py-6 md:py-10"
      style={{ background: "linear-gradient(160deg, #FFF8EC 0%, #E8F8FF 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#FFB830", filter: "blur(70px)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#4ECDC4", filter: "blur(80px)", transform: "translate(-30%, 30%)" }}
      />

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6 animate-pop-in">
        <Link
          href="/"
          className="press-effect flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm"
          style={{
            background: "white",
            border: "2px solid #E0E0E0",
            color: "#5A5A7A",
            boxShadow: "0 3px 0 #E0E0E0",
            textDecoration: "none",
          }}
        >
          ← Profiles
        </Link>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-sm"
            style={{
              background: "white",
              color: "#FF8F00",
              border: "2px solid #FFD580",
              boxShadow: "0 3px 0 #FFD580",
            }}
          >
            <StarIcon />
            <span className="ml-1">{profile.stars}</span>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-sm"
            style={{
              background: "white",
              color: "#FF6B6B",
              border: "2px solid #FFB8B8",
              boxShadow: "0 3px 0 #FFB8B8",
            }}
          >
            <FireIcon />
            <span className="ml-1">{profile.streak}</span>
          </div>
        </div>
      </div>

      {/* Welcome row */}
      <div className="flex items-end justify-between mb-2">
        <div className="animate-slide-up">
          <p className="text-lg font-bold" style={{ color: "#5A5A7A" }}>
            Hey, {profile.avatar} {profile.name}!
          </p>
          <h1
            className="text-3xl md:text-4xl font-black leading-tight"
            style={{ color: "#2D2D2D", fontFamily: "var(--font-nunito)" }}
          >
            What shall we<br />learn today?
          </h1>
        </div>
        <DuduMascot size={90} animate="bounce" />
      </div>

      {/* Speech bubble */}
      <div
        className="relative inline-block px-4 py-2.5 rounded-2xl text-sm font-bold mb-6 animate-pop-in"
        style={{
          background: "#FFE090",
          border: "2px solid #FFB830",
          color: "#2D2D2D",
          maxWidth: "240px",
        }}
      >
        &ldquo;I&apos;m ready to learn!&rdquo; 🐣
      </div>

      {/* Mode Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
        {MODES.map((mode, i) => (
          <div
            key={mode.id}
            className={`press-effect rounded-3xl overflow-hidden animate-pop-in card-${i + 1} ${mode.comingSoon ? "opacity-60" : ""}`}
            style={{
              background: `linear-gradient(145deg, ${mode.bgFrom}, ${mode.bgTo})`,
              border: `3px solid ${mode.border}`,
              boxShadow: mode.comingSoon
                ? "none"
                : `0 6px 0 ${mode.border}88, 0 10px 20px rgba(0,0,0,0.08)`,
              opacity: 0,
              cursor: mode.comingSoon ? "not-allowed" : "pointer",
            }}
          >
            <div className="p-5">
              <div className="text-4xl mb-2">{mode.emoji}</div>
              <h2
                className="text-xl font-black mb-0.5"
                style={{
                  color: mode.comingSoon ? "#999" : "#2D2D2D",
                  fontFamily: "var(--font-nunito)",
                }}
              >
                {mode.title}
              </h2>
              <p
                className="text-sm font-bold mb-2"
                style={{ color: mode.comingSoon ? "#bbb" : mode.badge }}
              >
                {mode.subtitle}
              </p>
              <p
                className="text-xs font-semibold leading-relaxed"
                style={{ color: mode.comingSoon ? "#bbb" : "#5A5A7A" }}
              >
                {mode.description}
              </p>

              {mode.comingSoon ? (
                <div
                  className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-extrabold"
                  style={{ background: "#E0E0E0", color: "#999" }}
                >
                  Coming Soon ⏳
                </div>
              ) : (
                <div
                  className="mt-3 inline-block px-4 py-1.5 rounded-2xl text-xs font-extrabold text-white"
                  style={{ background: mode.badge }}
                >
                  Let&apos;s Go! →
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-center text-sm font-bold mt-8 animate-slide-up"
        style={{ color: "#5A5A7A", animationDelay: "0.6s", opacity: 0 }}
      >
        ✨ Keep going — you&apos;re doing amazing!
      </p>
    </main>
  );
}
