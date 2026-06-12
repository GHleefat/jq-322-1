export interface Participant {
  id: string;
  name: string;
}

export interface ExclusionRule {
  id: string;
  participant1Id: string;
  participant2Id: string;
}

export interface DrawResult {
  [giverId: string]: string;
}

export interface AppState {
  participants: Participant[];
  exclusionRules: ExclusionRule[];
  drawResult: DrawResult | null;
  isDrawing: boolean;
  revealedIds: Set<string>;
  showResultModal: boolean;
  currentViewerId: string | null;
}

export interface AppActions {
  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  updateParticipant: (id: string, name: string) => void;
  addExclusionRule: (participant1Id: string, participant2Id: string) => void;
  removeExclusionRule: (id: string) => void;
  startDraw: () => Promise<boolean>;
  revealResult: (participantId: string) => void;
  closeResultModal: () => void;
  resetDraw: () => void;
  getParticipantName: (id: string) => string;
}

export type AppStore = AppState & AppActions;
