import { create } from "zustand";
import type { AppStore } from "@/types";
import { generateDraw, generateId } from "@/utils/drawAlgorithm";

const defaultParticipants = [
  { id: generateId(), name: "小明" },
  { id: generateId(), name: "小红" },
  { id: generateId(), name: "小刚" },
  { id: generateId(), name: "小丽" },
  { id: generateId(), name: "小华" },
  { id: generateId(), name: "小美" },
];

export const useAppStore = create<AppStore>((set, get) => ({
  participants: defaultParticipants,
  exclusionRules: [],
  drawResult: null,
  isDrawing: false,
  revealedIds: new Set(),
  showResultModal: false,
  currentViewerId: null,

  addParticipant: (name: string) => {
    if (!name.trim()) return;
    set((state) => ({
      participants: [
        ...state.participants,
        { id: generateId(), name: name.trim() },
      ],
    }));
  },

  removeParticipant: (id: string) => {
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
      exclusionRules: state.exclusionRules.filter(
        (r) => r.participant1Id !== id && r.participant2Id !== id,
      ),
    }));
  },

  updateParticipant: (id: string, name: string) => {
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? { ...p, name: name.trim() || p.name } : p,
      ),
    }));
  },

  addExclusionRule: (participant1Id: string, participant2Id: string) => {
    if (participant1Id === participant2Id) return;
    set((state) => {
      const exists = state.exclusionRules.some(
        (r) =>
          (r.participant1Id === participant1Id &&
            r.participant2Id === participant2Id) ||
          (r.participant1Id === participant2Id &&
            r.participant2Id === participant1Id),
      );
      if (exists) return state;
      return {
        exclusionRules: [
          ...state.exclusionRules,
          { id: generateId(), participant1Id, participant2Id },
        ],
      };
    });
  },

  removeExclusionRule: (id: string) => {
    set((state) => ({
      exclusionRules: state.exclusionRules.filter((r) => r.id !== id),
    }));
  },

  startDraw: async () => {
    const { participants, exclusionRules } = get();
    if (participants.length < 2) return false;

    set({ isDrawing: true });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = generateDraw(participants, exclusionRules);

    if (result) {
      set({ drawResult: result, isDrawing: false, revealedIds: new Set() });
      return true;
    } else {
      set({ isDrawing: false });
      return false;
    }
  },

  revealResult: (participantId: string) => {
    set((state) => ({
      showResultModal: true,
      currentViewerId: participantId,
      revealedIds: new Set([...state.revealedIds, participantId]),
    }));
  },

  closeResultModal: () => {
    set({ showResultModal: false, currentViewerId: null });
  },

  resetDraw: () => {
    set({
      drawResult: null,
      revealedIds: new Set(),
      showResultModal: false,
      currentViewerId: null,
    });
  },

  getParticipantName: (id: string) => {
    const participant = get().participants.find((p) => p.id === id);
    return participant?.name || "未知";
  },
}));
