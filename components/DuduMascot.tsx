interface DuduMascotProps {
  size?: number;
  className?: string;
  animate?: "bounce" | "float" | "wiggle" | "none";
}

export default function DuduMascot({
  size = 120,
  className = "",
  animate = "bounce",
}: DuduMascotProps) {
  const animClass =
    animate === "bounce" ? "animate-bounce-dudu" :
    animate === "float" ? "animate-float" :
    animate === "wiggle" ? "animate-wiggle" : "";

  return (
    <div
      className={`inline-block select-none ${animClass} ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Dudu the baby bird mascot"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        {/* Shadow */}
        <ellipse cx="60" cy="112" rx="28" ry="6" fill="rgba(0,0,0,0.08)" />

        {/* Body */}
        <ellipse cx="60" cy="76" rx="32" ry="30" fill="#FFD54F" />

        {/* Belly */}
        <ellipse cx="60" cy="82" rx="18" ry="16" fill="#FFF8DC" />

        {/* Left wing */}
        <ellipse
          cx="31"
          cy="76"
          rx="12"
          ry="9"
          fill="#FFB300"
          transform="rotate(-20 31 76)"
        />

        {/* Right wing */}
        <ellipse
          cx="89"
          cy="76"
          rx="12"
          ry="9"
          fill="#FFB300"
          transform="rotate(20 89 76)"
        />

        {/* Head */}
        <circle cx="60" cy="46" r="28" fill="#FFD54F" />

        {/* Head top fluff */}
        <circle cx="52" cy="20" r="8" fill="#FFB300" />
        <circle cx="60" cy="16" r="9" fill="#FFB300" />
        <circle cx="68" cy="20" r="8" fill="#FFB300" />

        {/* Eyes */}
        {/* Left eye white */}
        <circle cx="50" cy="44" r="9" fill="white" />
        {/* Right eye white */}
        <circle cx="70" cy="44" r="9" fill="white" />
        {/* Left pupil */}
        <circle cx="52" cy="45" r="5" fill="#2D2D2D" />
        {/* Right pupil */}
        <circle cx="72" cy="45" r="5" fill="#2D2D2D" />
        {/* Eye shine left */}
        <circle cx="54" cy="42" r="2" fill="white" />
        {/* Eye shine right */}
        <circle cx="74" cy="42" r="2" fill="white" />

        {/* Cheeks */}
        <circle cx="43" cy="52" r="7" fill="#FFB830" opacity="0.5" />
        <circle cx="77" cy="52" r="7" fill="#FFB830" opacity="0.5" />

        {/* Beak */}
        <path d="M54 57 L66 57 L60 66 Z" fill="#FF8F00" />
        <line x1="54" y1="57" x2="66" y2="57" stroke="#E65100" strokeWidth="1.5" />

        {/* Feet */}
        <path d="M48 104 L44 112 M48 104 L48 112 M48 104 L52 112" stroke="#FF8F00" strokeWidth="3" strokeLinecap="round" />
        <path d="M72 104 L68 112 M72 104 L72 112 M72 104 L76 112" stroke="#FF8F00" strokeWidth="3" strokeLinecap="round" />

        {/* Stars/sparkles around head */}
        <path d="M18 30 L20 26 L22 30 L18 30" fill="#FFD54F" opacity="0.8" />
        <path d="M98 28 L100 24 L102 28 L98 28" fill="#4ECDC4" opacity="0.8" />
        <circle cx="14" cy="55" r="3" fill="#FF6B6B" opacity="0.7" />
        <circle cx="106" cy="50" r="2.5" fill="#6BCB77" opacity="0.7" />
      </svg>
    </div>
  );
}
