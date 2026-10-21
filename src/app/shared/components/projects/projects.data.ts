export interface ProjectPreview {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  using: readonly string[];
  githubLink: string;
  liveDemoLink?: string;
}

export const PROJECTS: readonly ProjectPreview[] = [
  {
    id: '01',
    title: "Louan's Reise",
    image: 'img/louans_reise.png',
    alt: "Preview of Louan's Reise",
    description: "A jump-and-run game where Louan embarks on a journey to find his siblings.",
    using: ['HTML', 'CSS', 'JavaScript'],
    githubLink: 'https://github.com/4ergert/Louan-s-Reise',
    liveDemoLink: 'https://louans-reise.julian-hergert.de'
  },
  {
    id: '02',
    title: 'Poll App',
    image: 'img/poll_app.png',
    alt: 'Preview of Poll App',
    description: "An app to create and participate in polls. Users can vote on various topics and see real-time results.",
    using: ['HTML', 'CSS', 'TypeScript', 'Angular'],
    githubLink: 'https://github.com/4ergert/poll-app'
  },
  {
    id: '03',
    title: 'Kanban Board',
    image: 'img/kanban.png',
    alt: 'Preview of Kanban Board',
    description: "A digital Kanban board for task management. Organize tasks into columns and track progress visually.",
    using: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    githubLink: 'https://github.com/krummi14/Join---kanban-board'
  },
  {
    id: '04',
    title: 'Memory Game',
    image: 'img/memory.png',
    alt: 'Preview of Memory Game',
    description: "A classic memory game where players match pairs of cards. Test and improve your memory skills.",
    using: ['HTML', 'CSS', 'TypeScript'],
    githubLink: 'https://github.com/4ergert/memory-game'
  },
];
