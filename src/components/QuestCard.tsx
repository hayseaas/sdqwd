import { Quest, ColumnId } from "@/hooks/useQuestStore";
import { Check, Trash2, GripVertical, Flame, Shield, Sword } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  high: { icon: Flame, label: "Alta", className: "text-red-400" },
  medium: { icon: Shield, label: "Média", className: "text-gold" },
  low: { icon: Sword, label: "Baixa", className: "text-muted-foreground" },
};

export function QuestCard({ quest, onComplete, onDelete }: QuestCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: quest.id,
    data: { quest },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const PriorityIcon = priorityConfig[quest.priority].icon;
  const isDone = quest.column === "done";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-3 rounded-lg border border-border bg-card p-3 parchment-bg transition-all
        ${isDragging ? "opacity-50 gold-glow scale-105 z-50" : "hover:border-gold-dark"}
        ${isDone ? "opacity-70" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-gold touch-none"
        aria-label="Arrastar"
      >
        <GripVertical size={16} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <PriorityIcon size={14} className={priorityConfig[quest.priority].className} />
          <span className={`font-body text-sm truncate ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {quest.title}
          </span>
        </div>
        {quest.description && (
          <p className="mt-1 text-xs text-muted-foreground truncate">{quest.description}</p>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isDone && (
          <button
            onClick={() => onComplete(quest.id)}
            className="rounded p-1 text-muted-foreground hover:text-green-400 hover:bg-forest/50 transition-colors"
            aria-label="Concluir missão"
          >
            <Check size={14} />
          </button>
        )}
        <button
          onClick={() => onDelete(quest.id)}
          className="rounded p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-colors"
          aria-label="Deletar missão"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
