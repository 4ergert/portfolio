export interface ProjectPreview {
  id: string;
  title: string;
  image: string;
  alt: string;
}

export const PROJECTS: readonly ProjectPreview[] = [
  {
    id: 'louans-reise',
    title: "Louan's Reise",
    image: 'img/louans_reise.png',
    alt: "Preview of Louan's Reise",
  },
  {
    id: 'poll-app',
    title: 'Poll App',
    image: 'img/poll_app.png',
    alt: 'Preview of Poll App',
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    image: 'img/kanban.png',
    alt: 'Preview of Kanban Board',
  },
  {
    id: 'memory-game',
    title: 'Memory Game',
    image: 'img/memory.png',
    alt: 'Preview of Memory Game',
  },
];
