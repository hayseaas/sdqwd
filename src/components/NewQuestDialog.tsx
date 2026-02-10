import { useState } from "react";
import { Priority } from "@/hooks/useQuestStore";
import { Plus, Flame, Shield, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";

interface NewQuestDialogProps {
  onAdd: (title: string, description: string, priority: Priority) => void;
}

export function NewQuestDialog({ onAdd }: NewQuestDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), priority);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setOpen(false);
  };

  const priorities: { value: Priority; label: string; icon: typeof Flame }[] = [
    { value: "high", label: "Alta", icon: Flame },
    { value: "medium", label: "Média", icon: Shield },
    { value: "low", label: "Baixa", icon: Sword },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-gold-dark to-gold text-primary-foreground font-medieval hover:from-gold hover:to-gold-light gold-glow">
          <Plus size={18} />
          Nova Missão
        </Button>
      </DialogTrigger>
      <DialogContent className="border-gold/30 bg-card parchment-bg">
        <DialogHeader>
          <DialogTitle className="font-medieval text-2xl text-gold">Nova Missão</DialogTitle>
          <DialogDescription className="text-muted-foreground">Crie uma nova missão para o seu quadro de aventuras.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label className="text-foreground">Título da Missão</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Derrotar o dragão do relatório..."
              className="border-border bg-background/50 placeholder:text-muted-foreground/50"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Descrição (opcional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes da missão..."
              className="border-border bg-background/50 placeholder:text-muted-foreground/50 min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Prioridade</Label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPriority(p.value)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-all
                    ${priority === p.value
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted-foreground hover:border-gold/30"
                    }`}
                >
                  <p.icon size={14} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="border-border">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="bg-gradient-to-r from-gold-dark to-gold text-primary-foreground font-medieval hover:from-gold hover:to-gold-light"
          >
            Criar Missão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
