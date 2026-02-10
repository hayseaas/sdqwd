import { Quest, ColumnId } from "@/hooks/useQuestStore";
import { QuestCard } from "./QuestCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Scroll, Swords, Trophy } from "lucide-react";

interface KanbanColumnProps {
  id: ColumnId;
  title: string;
  quests: Quest[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const columnConfig: Record<ColumnId, { icon: typeof Scroll; bgClass: string }> = {
  todo: { icon: Scroll, bgClass: "bg-brown-medium inner-shadow" },
  "in-progress": { icon: Swords, bgClass: "bg-brown-light inner-shadow" },
  done: { icon: Trophy, bgClass: "bg-forest inner-shadow" },
};

export function KanbanColumn({ id, title, quests, onComplete, onDelete }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const config = columnConfig[id];
  const Icon = config.icon;

  return (
    <div
      className={`flex flex-col rounded-xl border border-border ${config.bgClass} min-h-[300px] transition-all
        ${isOver ? "ring-2 ring-gold/50 scale-[1.01]" : ""}`}
    >
      <div className="flex items-center gap-2 border-b border-border p-4">
        <Icon size={18} className="text-gold" />
        <h2 className="font-medieval text-lg text-gold">{title}</h2>
        <span className="ml-auto rounded-full bg-background/50 px-2 py-0.5 text-xs text-muted-foreground">
          {quests.length}
        </span>
      </div>

      <div ref={setNodeRef} className="flex-1 space-y-2 p-3 overflow-y-auto max-h-[60vh]">
        <SortableContext items={quests.map((q) => q.id)} strategy={verticalListSortingStrategy}>
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} onComplete={onComplete} onDelete={onDelete} />
          ))}
        </SortableContext>
        {quests.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground italic">Nenhuma missão aqui...</p>
        )}
      </div>
    </div>
  );
}
