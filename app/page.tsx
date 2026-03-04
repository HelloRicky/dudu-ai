import Link from "next/link";
import DuduMascot from "@/components/DuduMascot";

interface Profile {
  id: string;
  name: string;
  age: number;
  streak: number;
  stars: number;
  avatar: string;
  bgFrom: string;
  bgTo: string;
  border: string;
  badge: string;
}

const profiles: Profile[] = [
  {
    id: "johnny",
    name: "Johnny",
    age: 7,
    streak: 5,
    stars: 142,
    avatar: "🦁",
    bgFrom: "#FFF3D4",
    bgTo: "#FFE0A0",
    border: "#FFB830",
    badge: "#FF8F00",
  },
  {
    id: "jasmine",
    name: "Jasmine",
    age: 5,
    streak: 3,
    stars: 89,
    avatar: "🦋",
    bgFrom: "#E8F8FF",
    bgTo: "#B8EDFF",
    border: "#4ECDC4",
    badge: "#009688",
  },
];

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`inline-block ${className}`}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FireIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`inline-block ${className}`}>
      <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5 0.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
    </svg>
  );
}

export default function ProfileSelectionPage() {
  return (
    <main className="star-bg min-h-screen flex flex-col items-center justify-start px-4 py-8 md:py-12"
      style={{ background: "linear-gradient(160deg, #FFF8EC 0%, #E8F8FF 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#FFB830", filter: "blur(60px)", transform: "translate(-30%, -30%)" }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "#4ECDC4", filter: "blur(80px)", transform: "translate(30%, 30%)" }} />

      {/* Header */}
      <div className="text-center mb-2 animate-pop-in">
        <DuduMascot size={110} animate="bounce" className="mx-auto mb-1" />
        <h1
          className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
          style={{ color: "#2D2D2D", fontFamily: "var(--font-nunito)" }}
        >
          Hi there! 👋
        </h1>
        <p
          className="text-xl md:text-2xl font-bold mt-1"
          style={{ color: "#5A5A7A" }}
        >
          Who&apos;s learning with Dudu today?
        </p>
      </div>

      {/* Profile Cards */}
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md sm:max-w-xl mt-6">
        {profiles.map((profile, i) => (
          <Link
            key={profile.id}
            href={`/${profile.id}`}
            className={`press-effect flex-1 rounded-3xl overflow-hidden animate-pop-in card-${i + 1}`}
            style={{
              background: `linear-gradient(145deg, ${profile.bgFrom}, ${profile.bgTo})`,
              border: `3px solid ${profile.border}`,
              boxShadow: `0 8px 0 ${profile.border}88, 0 12px 24px rgba(0,0,0,0.1)`,
              opacity: 0,
            }}
          >
            <div className="p-6 flex flex-col items-center gap-3">
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                style={{
                  background: "white",
                  border: `3px solid ${profile.border}`,
                  boxShadow: `0 4px 12px ${profile.border}44`,
                }}
              >
                {profile.avatar}
              </div>

              {/* Name & Age */}
              <div className="text-center">
                <h2
                  className="text-3xl font-black"
                  style={{ color: "#2D2D2D", fontFamily: "var(--font-nunito)" }}
                >
                  {profile.name}
                </h2>
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-sm font-bold text-white mt-1"
                  style={{ background: profile.badge }}
                >
                  Age {profile.age}
                </span>
              </div>

              {/* Stats */}
              <div className="flex gap-4 w-full justify-center">
                {/* Stars */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-bold text-sm"
                  style={{ background: "rgba(255,255,255,0.7)", color: "#FF8F00" }}
                >
                  <StarIcon className="w-4 h-4" />
                  <span>{profile.stars}</span>
                </div>

                {/* Streak */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-bold text-sm"
                  style={{ background: "rgba(255,255,255,0.7)", color: "#FF6B6B" }}
                >
                  <FireIcon className="w-4 h-4" />
                  <span>{profile.streak} day streak</span>
                </div>
              </div>

              {/* Tap hint */}
              <div
                className="w-full py-2.5 rounded-2xl text-center text-sm font-extrabold text-white"
                style={{ background: profile.border }}
              >
                Tap to Play! 🎉
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p
        className="mt-8 text-sm font-semibold animate-slide-up"
        style={{ color: "#5A5A7A", animationDelay: "0.5s", opacity: 0 }}
      >
        🐣 DuduAI — Learning is an adventure!
      </p>
    </main>
  );
}
