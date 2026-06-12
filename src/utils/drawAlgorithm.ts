import type { Participant, ExclusionRule, DrawResult } from "@/types";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isValidAssignment(
  givers: Participant[],
  receivers: Participant[],
  exclusionRules: ExclusionRule[]
): boolean {
  const exclusionMap = new Map<string, Set<string>>();

  for (const rule of exclusionRules) {
    if (!exclusionMap.has(rule.participant1Id)) {
      exclusionMap.set(rule.participant1Id, new Set());
    }
    if (!exclusionMap.has(rule.participant2Id)) {
      exclusionMap.set(rule.participant2Id, new Set());
    }
    exclusionMap.get(rule.participant1Id)!.add(rule.participant2Id);
    exclusionMap.get(rule.participant2Id)!.add(rule.participant1Id);
  }

  for (let i = 0; i < givers.length; i++) {
    const giver = givers[i];
    const receiver = receivers[i];

    if (giver.id === receiver.id) {
      return false;
    }

    if (exclusionMap.get(giver.id)?.has(receiver.id)) {
      return false;
    }
  }

  return true;
}

export function generateDraw(
  participants: Participant[],
  exclusionRules: ExclusionRule[],
  maxAttempts: number = 10000
): DrawResult | null {
  if (participants.length < 2) {
    return null;
  }

  const givers = [...participants];

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const receivers = shuffle(participants);

    if (isValidAssignment(givers, receivers, exclusionRules)) {
      const result: DrawResult = {};
      for (let i = 0; i < givers.length; i++) {
        result[givers[i].id] = receivers[i].id;
      }
      return result;
    }
  }

  return null;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
