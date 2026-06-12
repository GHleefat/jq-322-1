import { useMemo } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Snowflakes() {
  const snowflakes = useMemo<Snowflake[]>(() => {
    const count = 30;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 6,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 15,
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 will-change-transform">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-christmas-snow select-none"
          style={{
            left: `${flake.left}%`,
            top: "-5vh",
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
