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
    title: { en: "Grimoire", de: 'Grimoire' },
    image: 'img/grimoire.png',
    alt: { en: "Preview of Grimoire", de: 'Vorschau von Grimoire' },
    description: {
      en: 'A chess platform for building and training your own opening repertoire and analyzing games with Stockfish - one of the strongest chess engines in the world - and trying to beat the engine across 10 different difficulty levels.',
      de: 'Eine Schachplattform zum bauen und trainieren des eigenen Eröffnungsrepertoires, Analysieren mit Stockfish -  einer der weltweit stärksten Schach-Engines - und versuche ihn in 10 Schwierigkeitsgraden zu besiegen.',
    },
    using: ['JavaScript', 'TypeScript', 'Angular'],
    githubLink: 'https://github.com/4ergert/grimoire',
    liveDemoLink: 'https://grimoire.julian-hergert.de'
  },
  {
    id: '02',
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
    id: '03',
    title: { en: 'Poll App', de: 'Umfrage-App' },
    image: 'img/poll_app.png',
    alt: { en: 'Preview of Poll App', de: 'Vorschau der Umfrage-App' },
    description: {
      en: 'An app to create and participate in polls. Users can vote on various topics and see real-time results.',
      de: 'Eine App zum Erstellen und Teilnehmen an Umfragen. Nutzer können über verschiedene Themen abstimmen und Ergebnisse in Echtzeit sehen.',
    },
    using: ['HTML', 'CSS', 'TypeScript', 'Angular'],
    githubLink: 'https://github.com/4ergert/poll-app',
    liveDemoLink: 'https://poll-app.julian-hergert.de'
  },
  {
    id: '04',
    title: { en: 'Join', de: 'Join' },
    image: 'img/kanban.png',
    alt: { en: 'Preview of Kanban Board', de: 'Vorschau des Kanban-Boards' },
    description: {
      en: 'A digital Kanban board for task management. Organize tasks into columns and track progress visually.',
      de: 'Ein digitales Kanban-Board zur Aufgabenverwaltung. Aufgaben lassen sich in Spalten organisieren und Fortschritte übersichtlich verfolgen.',
    },
    using: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    githubLink: 'https://github.com/krummi14/Join---kanban-board',
    liveDemoLink: 'https://join.julian-hergert.de'
  },
  {
    id: '05',
    title: { en: 'Memory Game', de: 'Memory-Spiel' },
    image: 'img/memory.png',
    alt: { en: 'Preview of Memory Game', de: 'Vorschau des Memory-Spiels' },
    description: {
      en: 'A classic memory game where players match pairs of cards. Test and improve your memory skills.',
      de: 'Ein klassisches Memory-Spiel, bei dem Kartenpaare gefunden werden. Teste und verbessere dein Gedächtnis.',
    },
    using: ['HTML', 'CSS', 'TypeScript'],
    githubLink: 'https://github.com/4ergert/memory-game',
    liveDemoLink: 'https://memory-game.julian-hergert.de'
  }
];
