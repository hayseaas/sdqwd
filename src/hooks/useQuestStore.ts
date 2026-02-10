import { useState, useEffect, useCallback } from "react";

export type Priority = "low" | "medium" | "high";
export type ColumnId = "todo" | "in-progress" | "done";

export interface Quest {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  column: ColumnId;
  createdAt: number;
}

export interface HeroState {
  xp: number;
  level: number;
}

const XP_PER_QUEST = 25;
const XP_PER_LEVEL = 100;

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function useQuestStore() {
  const [quests, setQuests] = useState<Quest[]>(() => loadFromStorage("quests", []));
  const [hero, setHero] = useState<HeroState>(() => loadFromStorage("hero", { xp: 0, level: 1 }));

  useEffect(() => {
    localStorage.setItem("quests", JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem("hero", JSON.stringify(hero));
  }, [hero]);

  const addQuest = useCallback((title: string, description: string, priority: Priority) => {
    const quest: Quest = {
      id: crypto.randomUUID(),
      title,
      description: description || undefined,
      priority,
      column: "todo",
      createdAt: Date.now(),
    };
    setQuests((prev) => [...prev, quest]);
  }, []);

  const deleteQuest = useCallback((id: string) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const moveQuest = useCallback((id: string, toColumn: ColumnId) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        if (q.column !== "done" && toColumn === "done") {
          setHero((h) => {
            const newXp = h.xp + XP_PER_QUEST;
            const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
            return { xp: newXp, level: newLevel };
          });
        }
        return { ...q, column: toColumn };
      })
    );
  }, []);

  const completeQuest = useCallback((id: string) => {
    moveQuest(id, "done");
  }, [moveQuest]);

  const questsByColumn = useCallback(
    (column: ColumnId) => quests.filter((q) => q.column === column),
    [quests]
  );

  return { quests, hero, addQuest, deleteQuest, moveQuest, completeQuest, questsByColumn };
}
