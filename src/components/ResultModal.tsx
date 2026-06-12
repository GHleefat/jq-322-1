import { useEffect, useState } from "react";
import { X, Gift, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  speedY: number;
  speedX: number;
  rotationSpeed: number;
}

export default function ResultModal() {
  const {
    showResultModal,
    currentViewerId,
    closeResultModal,
    drawResult,
    getParticipantName,
  } = useAppStore();
  const [showName, setShowName] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const viewerName = currentViewerId ? getParticipantName(currentViewerId) : "";
  const receiverId =
    currentViewerId && drawResult ? drawResult[currentViewerId] : null;
  const receiverName = receiverId ? getParticipantName(receiverId) : "";

  useEffect(() => {
    if (showResultModal) {
      setShowName(false);
      setConfetti([]);
      const timer = setTimeout(() => {
        setShowName(true);
        createConfetti();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showResultModal, currentViewerId]);

  const createConfetti = () => {
    const colors = ["#C41E3A", "#D4AF37", "#0B6623", "#FFFAF0", "#F0D060"];
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 60; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    setConfetti(newConfetti);
  };

  useEffect(() => {
    if (confetti.length === 0) return;

    const interval = setInterval(() => {
      setConfetti((prev) =>
        prev
          .map((c) => ({
            ...c,
            y: c.y + c.speedY,
            x: c.x + c.speedX,
            rotation: c.rotation + c.rotationSpeed,
          }))
          .filter((c) => c.y < window.innerHeight + 50),
      );
    }, 16);

    return () => clearInterval(interval);
  }, [confetti.length]);

  if (!showResultModal) return null;

  return (
    <>
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti"
          style={{
            left: c.x,
            top: c.y,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            transform: `rotate(${c.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}

      <div className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-christmas-red to-christmas-red-dark rounded-3xl p-8 max-w-md w-full border-4 border-christmas-gold card-shadow-lg animate-pop-in">
          <button
            onClick={closeResultModal}
            className="absolute top-4 right-4 text-christmas-snow/70 hover:text-christmas-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="relative">
                <Gift className="w-16 h-16 text-christmas-gold mx-auto animate-float" />
                <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-pulse-soft" />
              </div>
            </div>

            <h2 className="text-2xl font-display text-christmas-gold mb-2">
              {viewerName}
            </h2>
            <p className="text-christmas-snow/80 mb-6">你抽到的是</p>

            <div
              className={`relative ${showName ? "animate-pop-in" : "opacity-0"}`}
            >
              <div className="gold-gradient rounded-2xl p-6 inline-block min-w-[200px]">
                <p className="text-4xl font-display text-christmas-red-dark">
                  {receiverName}
                </p>
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex gap-8">
                  <div className="w-1 h-8 bg-christmas-gold rounded-full" />
                  <div className="w-1 h-8 bg-christmas-gold rounded-full" />
                </div>
              </div>
            </div>

            <p className="mt-6 text-christmas-snow/70 text-sm">
              🎁 记得为 TA 准备一份惊喜礼物哦！
            </p>

            <button
              onClick={closeResultModal}
              className="mt-6 px-8 py-3 bg-christmas-green hover:bg-christmas-green-dark text-christmas-snow rounded-full font-semibold transition-all hover:scale-105 border-2 border-christmas-gold/50"
            >
              知道啦
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
