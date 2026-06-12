import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, ArrowLeft, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import Snowflakes from "@/components/Snowflakes";
import ResultModal from "@/components/ResultModal";

export default function ResultPage() {
  const navigate = useNavigate();
  const {
    participants,
    drawResult,
    revealedIds,
    revealResult,
    resetDraw,
    isDrawing,
  } = useAppStore();

  useEffect(() => {
    if (!drawResult && !isDrawing) {
      navigate("/");
    }
  }, [drawResult, isDrawing, navigate]);

  const handleBack = () => {
    resetDraw();
    navigate("/");
  };

  const handleRedraw = () => {
    navigate("/");
  };

  if (!drawResult) return null;

  return (
    <div className="min-h-screen relative">
      <Snowflakes />
      <ResultModal />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-christmas-snow/70 hover:text-christmas-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回设置
          </button>

          <button
            onClick={handleRedraw}
            className="flex items-center gap-2 px-4 py-2 bg-christmas-gold/20 hover:bg-christmas-gold/30 text-christmas-gold rounded-xl transition-all border border-christmas-gold/30"
          >
            <RefreshCw className="w-4 h-4" />
            重新抽签
          </button>
        </div>

        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <Gift className="w-14 h-14 text-christmas-gold mx-auto animate-float" />
          </div>
          <h1 className="text-4xl font-display text-christmas-gold mb-3">
            抽签完成！
          </h1>
          <p className="text-christmas-snow/80">
            🎁 找到你的名字，点击查看你抽到了谁 🎁
          </p>
        </div>

        <div className="bg-christmas-snow/10 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-christmas-gold/30 card-shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {participants.map((p, index) => {
              const isRevealed = revealedIds.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => revealResult(p.id)}
                  className="group relative bg-gradient-to-br from-christmas-red to-christmas-red-dark hover:from-christmas-red-dark hover:to-christmas-red p-5 rounded-2xl border-2 border-christmas-gold/30 hover:border-christmas-gold transition-all hover:scale-105 hover:shadow-xl card-shadow"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <div className="relative">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-6">
                      <div className="w-0.5 h-4 bg-christmas-gold rounded-full" />
                      <div className="w-0.5 h-4 bg-christmas-gold rounded-full" />
                    </div>

                    <div className="pt-2">
                      <p className="text-christmas-snow font-semibold text-lg truncate">
                        {p.name}
                      </p>

                      <div className="mt-3 flex items-center justify-center gap-2 text-christmas-gold/80 text-sm">
                        {isRevealed ? (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>已查看</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            <span>点击查看</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-christmas-gold/40 rounded-full" />

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Gift className="w-4 h-4 text-christmas-gold/60" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-christmas-gold/10 px-6 py-3 rounded-full border border-christmas-gold/20">
            <span className="text-christmas-snow/70">
              共 {participants.length} 人参与抽签
            </span>
            <span className="text-christmas-gold">·</span>
            <span className="text-christmas-snow/70">
              {revealedIds.size} 人已查看
            </span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="bg-christmas-red/20 border border-christmas-gold/30 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-xl font-display text-christmas-gold mb-3">
              🎅 使用提示
            </h3>
            <ul className="text-christmas-snow/70 text-sm space-y-2 text-left">
              <li>• 每人只能看到自己抽到了谁</li>
              <li>• 点击你的名字卡片查看结果</li>
              <li>• 查看过的卡片会标记"已查看"</li>
              <li>• 记得为抽到的人准备惊喜礼物哦！</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-christmas-snow/40 text-sm">
          <p>🎄 Merry Christmas & Happy New Year 🎄</p>
        </div>
      </div>
    </div>
  );
}
