import { useState } from "react";
import {
  Plus,
  Trash2,
  Users,
  Ban,
  Gift,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import Snowflakes from "@/components/Snowflakes";
import DrawAnimation from "@/components/DrawAnimation";

export default function SetupPage() {
  const {
    participants,
    exclusionRules,
    addParticipant,
    removeParticipant,
    addExclusionRule,
    removeExclusionRule,
    startDraw,
    getParticipantName,
    isDrawing,
  } = useAppStore();

  const [newName, setNewName] = useState("");
  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [error, setError] = useState("");

  const handleAddParticipant = () => {
    const trimmed = newName.trim();
    if (trimmed) {
      addParticipant(trimmed);
      setNewName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddParticipant();
    }
  };

  const handleAddExclusion = () => {
    if (selected1 && selected2 && selected1 !== selected2) {
      addExclusionRule(selected1, selected2);
      setSelected1("");
      setSelected2("");
    }
  };

  const handleStartDraw = async () => {
    setError("");
    if (participants.length < 2) {
      setError("至少需要 2 位参与者才能开始抽签");
      return;
    }

    const success = await startDraw();
    if (!success) {
      setError("无法找到满足所有规则的配对方案，请减少互斥规则后重试");
    }
  };

  return (
    <div className="min-h-screen relative">
      <Snowflakes />
      <DrawAnimation />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="relative">
              <Gift className="w-16 h-16 text-christmas-gold mx-auto animate-float" />
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-1 -right-2 animate-pulse-soft" />
            </div>
          </div>
          <h1 className="text-5xl font-display text-christmas-gold mb-3 drop-shadow-lg">
            礼物交换抽签
          </h1>
          <p className="text-christmas-snow/80 text-lg">
            🎄 圣诞节 / 年会礼物交换配对工具 🎁
          </p>
        </div>

        <div className="bg-christmas-snow/10 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-christmas-gold/30 card-shadow-lg">
          <div className="flex items-center gap-3 mb-5">
            <Users className="w-6 h-6 text-christmas-gold" />
            <h2 className="text-2xl font-display text-christmas-gold">
              参与者名单
            </h2>
            <span className="ml-auto bg-christmas-gold/20 text-christmas-gold px-3 py-1 rounded-full text-sm font-semibold">
              {participants.length} 人
            </span>
          </div>

          <div className="flex gap-3 mb-5">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入姓名，按回车添加"
              className="flex-1 px-4 py-3 rounded-xl bg-christmas-snow/90 text-gray-800 border-2 border-christmas-gold/30 focus:border-christmas-gold focus:outline-none transition-colors placeholder:text-gray-400"
            />
            <button
              onClick={handleAddParticipant}
              disabled={!newName.trim()}
              className="px-5 py-3 bg-christmas-gold hover:bg-christmas-gold-light text-christmas-red-dark rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              添加
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
            {participants.map((p) => (
              <div
                key={p.id}
                className="group flex items-center justify-between bg-christmas-red/80 hover:bg-christmas-red px-4 py-3 rounded-xl border border-christmas-gold/30 transition-all hover:border-christmas-gold/60 card-shadow"
              >
                <span className="text-christmas-snow font-medium truncate">
                  {p.name}
                </span>
                <button
                  onClick={() => removeParticipant(p.id)}
                  className="ml-2 text-christmas-snow/50 hover:text-christmas-gold transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                  aria-label="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {participants.length === 0 && (
              <div className="col-span-full text-center py-8 text-christmas-snow/50">
                还没有参与者，快来添加吧～
              </div>
            )}
          </div>
        </div>

        <div className="bg-christmas-snow/10 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-christmas-gold/30 card-shadow-lg">
          <div className="flex items-center gap-3 mb-5">
            <Ban className="w-6 h-6 text-christmas-gold" />
            <h2 className="text-2xl font-display text-christmas-gold">
              互斥规则
            </h2>
          </div>

          <p className="text-christmas-snow/70 text-sm mb-4">
            设置不能互抽的配对（如夫妻、同部门同事等）
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <select
              value={selected1}
              onChange={(e) => {
                setSelected1(e.target.value);
                if (e.target.value === selected2) setSelected2("");
              }}
              className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-christmas-snow/90 text-gray-800 border-2 border-christmas-gold/30 focus:border-christmas-gold focus:outline-none transition-colors"
            >
              <option value="">选择第一人</option>
              {participants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <span className="text-christmas-gold font-bold text-xl px-2">
              ↔
            </span>

            <select
              value={selected2}
              onChange={(e) => setSelected2(e.target.value)}
              className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-christmas-snow/90 text-gray-800 border-2 border-christmas-gold/30 focus:border-christmas-gold focus:outline-none transition-colors"
            >
              <option value="">选择第二人</option>
              {participants
                .filter((p) => p.id !== selected1)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>

            <button
              onClick={handleAddExclusion}
              disabled={!selected1 || !selected2 || selected1 === selected2}
              className="px-4 py-3 bg-christmas-red hover:bg-christmas-red-dark text-christmas-snow rounded-xl font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 border border-christmas-gold/30"
            >
              <Plus className="w-5 h-5" />
              <span className="sm:hidden">添加</span>
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {exclusionRules.map((rule) => (
              <div
                key={rule.id}
                className="group flex items-center justify-between bg-christmas-red/50 hover:bg-christmas-red/70 px-4 py-2 rounded-xl border border-christmas-gold/20 transition-all"
              >
                <span className="text-christmas-snow">
                  {getParticipantName(rule.participant1Id)}{" "}
                  <span className="text-christmas-gold">✗</span>{" "}
                  {getParticipantName(rule.participant2Id)}
                </span>
                <button
                  onClick={() => removeExclusionRule(rule.id)}
                  className="text-christmas-snow/50 hover:text-christmas-gold transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                  aria-label="删除规则"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {exclusionRules.length === 0 && (
              <div className="text-center py-4 text-christmas-snow/50 text-sm">
                暂无互斥规则
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleStartDraw}
            disabled={participants.length < 2 || isDrawing}
            className="relative px-12 py-5 gold-gradient text-christmas-red-dark rounded-full text-xl font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 glow-button inline-flex items-center gap-3"
          >
            <Gift className="w-7 h-7" />
            开始抽签
            <Sparkles className="w-6 h-6" />
          </button>

          <p className="mt-4 text-christmas-snow/60 text-sm">
            {participants.length >= 2
              ? `共 ${participants.length} 人参与，每人都不会抽到自己`
              : "请至少添加 2 位参与者"}
          </p>
        </div>

        <div className="mt-12 text-center text-christmas-snow/40 text-sm">
          <p>✨ 所有数据仅保存在本地，确保隐私安全 ✨</p>
        </div>
      </div>
    </div>
  );
}
