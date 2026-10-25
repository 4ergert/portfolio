import type { Language } from '../../language-switcher/language.service';

export interface ProjectPreview {
  id: string;
  title: Record<Language, string>;
  image: string;
  alt: Record<Language, string>;
  description: Record<Language, string>;
  using: readonly string[];
  githubLink: string;
  liveDemoLink?: string;
}

export const PROJECTS: readonly ProjectPreview[] = [
  {
    id: '01',
    title: { en: "Louan's Reise", de: 'Louans Reise' },
    image: 'img/louans_reise.png',
    alt: { en: "Preview of Louan's Reise", de: 'Vorschau von Louans Reise' },
    description: {
      en: 'A jump-and-run game where Louan embarks on a journey to find his siblings.',
      de: 'Ein Jump-and-Run-Spiel, in dem Louan sich auf die Suche nach seinen Geschwistern macht.',
    },
    using: ['HTML', 'CSS', 'JavaScript'],
    githubLink: 'https://github.com/4ergert/Louan-s-Reise',
    liveDemoLink: 'https://louans-reise.julian-hergert.de'
  },
  {
    id: '02',
    title: { en: 'Poll App', de: 'Umfrage-App' },
    image: 'img/poll_app.png',
    alt: { en: 'Preview of Poll App', de: 'Vorschau der Umfrage-App' },
    description: {
      en: 'An app to create and participate in polls. Users can vote on various topics and see real-time results.',
      de: 'Eine App zum Erstellen und Teilnehmen an Umfragen. Nutzer können über verschiedene Themen abstimmen und Ergebnisse in Echtzeit sehen.',
    },
    using: ['HTML', 'CSS', 'TypeScript', 'Angular'],
    githubLink: 'https://github.com/4ergert/poll-app'
  },
  {
    id: '03',
    title: { en: 'Kanban Board', de: 'Kanban-Board' },
    image: 'img/kanban.png',
    alt: { en: 'Preview of Kanban Board', de: 'Vorschau des Kanban-Boards' },
    description: {
      en: 'A digital Kanban board for task management. Organize tasks into columns and track progress visually.',
      de: 'Ein digitales Kanban-Board zur Aufgabenverwaltung. Aufgaben lassen sich in Spalten organisieren und Fortschritte übersichtlich verfolgen.',
    },
    using: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    githubLink: 'https://github.com/krummi14/Join---kanban-board'
  },
  {
    id: '04',
    title: { en: 'Memory Game', de: 'Memory-Spiel' },
    image: 'img/memory.png',
    alt: { en: 'Preview of Memory Game', de: 'Vorschau des Memory-Spiels' },
    description: {
      en: 'A classic memory game where players match pairs of cards. Test and improve your memory skills.',
      de: 'Ein klassisches Memory-Spiel, bei dem Kartenpaare gefunden werden. Teste und verbessere dein Gedächtnis.',
    },
    using: ['HTML', 'CSS', 'TypeScript'],
    githubLink: 'https://github.com/4ergert/memory-game'
  },
];
