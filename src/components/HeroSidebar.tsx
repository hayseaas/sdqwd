import { HeroState } from "@/hooks/useQuestStore";
import { Shield, Swords, Timer, Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface HeroSidebarProps {
  hero: HeroState;
}

const XP_PER_LEVEL = 100;

export function HeroSidebar({ hero }: HeroSidebarProps) {
  const xpInLevel = hero.xp % XP_PER_LEVEL;
  const xpPercent = (xpInLevel / XP_PER_LEVEL) * 100;

  // Pomodoro state
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const resetTimer = () => { setIsRunning(false); setTimeLeft(25 * 60); };

  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <aside className="flex flex-col gap-5 rounded-xl border border-border bg-sidebar p-5 parchment-bg lg:w-72 w-full">
      {/* Hero Avatar & Level */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-accent gold-glow">
          <Shield size={40} className="text-gold" />
        </div>
        <div className="text-center">
          <h3 className="font-medieval text-xl text-gold">Cavaleiro</h3>
          <p className="text-sm text-muted-foreground">Nível {hero.level}</p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>XP</span>
          <span>{xpInLevel}/{XP_PER_LEVEL}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-background/50 border border-border">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold transition-all duration-700"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <p className="text-xs text-center text-muted-foreground">{hero.xp} XP total</p>
      </div>

      {/* Pomodoro Timer */}
      <div className="space-y-3 rounded-lg border border-border bg-background/30 p-4">
        <div className="flex items-center gap-2">
          <Swords size={16} className="text-gold" />
          <h4 className="font-medieval text-sm text-gold">Duelo</h4>
        </div>
        <div className="text-center font-medieval text-3xl text-foreground tabular-nums">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsRunning(!isRunning)}
            className="border-gold/30 hover:bg-gold/10 hover:text-gold"
          >
            {isRunning ? <Pause size={14} /> : <Play size={14} />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={resetTimer}
            className="border-gold/30 hover:bg-gold/10 hover:text-gold"
          >
            <RotateCcw size={14} />
          </Button>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="rounded-lg border border-border bg-background/30 overflow-hidden">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="!p-2 [&_.rdp-caption_label]:text-gold [&_.rdp-caption_label]:font-medieval [&_.rdp-head_cell]:text-muted-foreground [&_.rdp-day_selected]:bg-gold [&_.rdp-day_selected]:text-primary-foreground [&_.rdp-nav_button]:text-gold [&_.rdp-nav_button]:hover:bg-gold/10 [&_.rdp-day_today]:bg-accent [&_.rdp-cell]:text-xs [&_.rdp-head_cell]:text-xs"
        />
      </div>
    </aside>
  );
}
