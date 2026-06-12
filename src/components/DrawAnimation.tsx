import { useEffect, useRef, useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useNavigate } from "react-router-dom";

export default function DrawAnimation() {
  const { isDrawing, participants, drawResult } = useAppStore();
  const navigate = useNavigate();
  const [displayIndex, setDisplayIndex] = useState(0);
  const wasDrawing = useRef(false);

  useEffect(() => {
    if (!isDrawing || participants.length === 0) return;

    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % participants.length);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [isDrawing, participants.length]);

  useEffect(() => {
    if (wasDrawing.current && !isDrawing && drawResult) {
      const timer = setTimeout(() => {
        navigate("/result");
      }, 300);
      return () => clearTimeout(timer);
    }
    wasDrawing.current = isDrawing;
  }, [isDrawing, drawResult, navigate]);

  if (!isDrawing) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="text-center animate-pop-in">
        <div className="mb-8">
          <div className="relative inline-block animate-pulse-soft">
            <Gift className="w-32 h-32 text-christmas-gold mx-auto" />
            <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2" />
            <Sparkles
              className="w-6 h-6 text-yellow-300 absolute -bottom-1 -left-2"
              style={{ opacity: 0.7 }}
            />
          </div>
        </div>

        <h2 className="text-4xl font-display text-christmas-gold mb-6">
          正在抽签中...
        </h2>

        <div className="bg-christmas-red/20 rounded-2xl p-6 border-2 border-christmas-gold/50 min-w-[200px]">
          <p className="text-2xl font-body text-christmas-snow">
            {participants[displayIndex]?.name || "..."}
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <div
            className="w-3 h-3 bg-christmas-gold rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-3 h-3 bg-christmas-gold rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-3 h-3 bg-christmas-gold rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        <p className="mt-6 text-christmas-silver text-sm">
          请稍等，礼物精灵正在为大家配对 🎁
        </p>
      </div>
    </div>
  );
}
