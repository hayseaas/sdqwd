import { useQuestStore, ColumnId, Quest } from "@/hooks/useQuestStore";
import { KanbanColumn } from "@/components/KanbanColumn";
import { HeroSidebar } from "@/components/HeroSidebar";
import { NewQuestDialog } from "@/components/NewQuestDialog";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { QuestCard } from "@/components/QuestCard";

const columns: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "A Fazer" },
  { id: "in-progress", title: "Em Progresso" },
  { id: "done", title: "Concluído" },
];

const Index = () => {
  const { hero, addQuest, deleteQuest, moveQuest, completeQuest, questsByColumn } = useQuestStore();
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const quest = event.active.data.current?.quest as Quest | undefined;
    setActiveQuest(quest ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveQuest(null);
    const { active, over } = event;
    if (!over) return;

    const questId = active.id as string;
    const overColumn = over.id as ColumnId;

    if (columns.some((c) => c.id === overColumn)) {
      moveQuest(questId, overColumn);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row gap-4 p-4 lg:p-6">
      <HeroSidebar hero={hero} />

      <main className="flex-1 space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-medieval text-3xl lg:text-4xl text-gold">Quest Board</h1>
            <p className="text-sm text-muted-foreground">Seu painel de missões</p>
          </div>
          <NewQuestDialog onAdd={addQuest} />
        </header>

        {/* Kanban Board */}
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map((col) => (
              <KanbanColumn
                key={col.id}
                id={col.id}
                title={col.title}
                quests={questsByColumn(col.id)}
                onComplete={completeQuest}
                onDelete={deleteQuest}
              />
            ))}
          </div>
          <DragOverlay>
            {activeQuest && (
              <div className="opacity-90 rotate-2">
                <QuestCard quest={activeQuest} onComplete={() => {}} onDelete={() => {}} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
};

export default Index;
