

# 🏰 Quest Board — Painel de Produtividade RPG Medieval

## Visão Geral
Um app de lista de tarefas estilo Kanban com visual de RPG medieval, onde tarefas são "missões" e o progresso do usuário é gamificado com XP e avatar de personagem.

---

## 1. Tema Visual RPG Medieval
- Paleta de cores terrosas: fundo principal marrom escuro (#1a120b), dourado envelhecido para bordas/destaques, verde floresta para a coluna de "Concluído"
- Cards com aparência de pergaminho, bordas arredondadas e sombras internas para profundidade
- Fontes serifadas estilo fantasia para títulos (ex: "MedievalSharp" do Google Fonts) e sans-serif para texto de tarefas
- Ícones temáticos usando Lucide (espadas, escudos, etc.)

## 2. Layout Principal — Três Colunas Kanban
- **A FAZER** (fundo marrom escuro): Missões pendentes
- **EM PROGRESSO** (fundo marrom mais claro): Missões em andamento
- **CONCLUÍDO** (fundo verde escuro opaco): Missões completadas
- Drag-and-drop real entre colunas para mover tarefas
- Responsivo: colunas empilham verticalmente em mobile

## 3. Sidebar Esquerda — Painel do Herói
- **Avatar de personagem**: Ícone de soldado/guerreiro estilizado
- **Barra de XP**: Barra de progresso visual que avança ao completar tarefas
- **Cronômetro Pomodoro "Duelo"**: Timer estilo RPG com botões de iniciar/pausar/resetar (25 min padrão)
- **Mini-calendário**: Calendário compacto estilizado com o tema medieval

## 4. Cards de Tarefa (Missão)
- Cards horizontais dentro de cada coluna
- Cada card exibe: título da missão, prioridade (ícone/cor)
- Ícones de ação discretos: ✅ concluir, 🗑️ deletar, ↔️ arrastar
- Ao concluir uma tarefa, ela move para "Concluído" e o XP aumenta

## 5. Criação de Tarefas
- Botão "+ Nova Missão" destacado no topo direito em tom dourado/amarelo
- Modal/dialog para criar nova tarefa com campos: título, descrição opcional, prioridade

## 6. Persistência & Dados
- Todas as tarefas e estado do XP salvos em **localStorage**
- Sem necessidade de login ou backend

## 7. Funcionalidades Extras de Gamificação
- Sistema de XP: cada tarefa concluída dá pontos, barra de XP visual
- Nível do personagem baseado no XP acumulado

