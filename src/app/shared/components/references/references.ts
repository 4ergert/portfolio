import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../language-switcher/language.service';
import type { Language } from '../../language-switcher/language.service';

interface Reference {
  quote: Record<Language, string>;
  author: Record<Language, string>;
  role: Record<Language, string>;
}

@Component({
  selector: 'references',
  imports: [],
  templateUrl: './references.html',
  styleUrl: './references.scss',
})
export class References {
  readonly i18n = inject(LanguageService);
  private swipeStart: { id: number; x: number; y: number } | null = null;

  readonly references: Reference[] = [
    {
      quote: { en: 'Placeholder reference: Julian approaches challenges with care, communicates clearly, and always looks for practical solutions.', de: 'Beispielreferenz: Julian geht Herausforderungen sorgfältig an, kommuniziert klar und sucht stets nach praktischen Lösungen.' },
      author: { en: 'Sample colleague', de: 'Beispielkollege' },
      role: { en: 'Project partner', de: 'Projektpartner' },
    },
    {
      quote: { en: 'Placeholder reference: Julian is a reliable team member whose technical skills and proactive approach contribute to successful projects.', de: 'Beispielreferenz: Julian ist ein zuverlässiges Teammitglied, dessen technische Fähigkeiten und Eigeninitiative zum Erfolg von Projekten beitragen.' },
      author: { en: 'Sample colleague', de: 'Beispielkollege' },
      role: { en: 'Team partner', de: 'Teammitglied' },
    },
    {
      quote: { en: 'Placeholder reference: Working with Julian was a positive experience. He stayed focused, open to feedback, and committed to quality.', de: 'Beispielreferenz: Die Zusammenarbeit mit Julian war eine positive Erfahrung. Er blieb fokussiert, offen für Feedback und qualitätsbewusst.' },
      author: { en: 'Sample colleague', de: 'Beispielkollege' },
      role: { en: 'Development partner', de: 'Entwicklungspartner' },
    },
    {
      quote: { en: 'Placeholder reference: Julian combines an analytical mindset with creativity and persistence when solving complex tasks.', de: 'Beispielreferenz: Julian verbindet analytisches Denken mit Kreativität und Ausdauer, um komplexe Aufgaben zu lösen.' },
      author: { en: 'Sample colleague', de: 'Beispielkollege' },
      role: { en: 'Project collaborator', de: 'Projektmitarbeiter' },
    },
    {
      quote: { en: 'Placeholder reference: Julian combines an analytical mindset with creativity and persistence when solving complex tasks.', de: 'Beispielreferenz: Julian verbindet analytisches Denken mit Kreativität und Ausdauer, um komplexe Aufgaben zu lösen.' },
      author: { en: 'Sample colleague', de: 'Beispielkollege' },
      role: { en: 'Project collaborator', de: 'Projektmitarbeiter' },
    },
    {
      quote: { en: 'Placeholder reference: Julian combines an analytical mindset with creativity and persistence when solving complex tasks.', de: 'Beispielreferenz: Julian verbindet analytisches Denken mit Kreativität und Ausdauer, um komplexe Aufgaben zu lösen.' },
      author: { en: 'Sample colleague', de: 'Beispielkollege' },
      role: { en: 'Project collaborator', de: 'Projektmitarbeiter' },
    },
  ];

  readonly activeIndex = signal(0);

  onSwipeStart(event: PointerEvent): void {
    if (!event.isPrimary || event.pointerType !== 'touch') {
      return;
    }

    this.swipeStart = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };

    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  onSwipeEnd(event: PointerEvent): void {
    const start = this.swipeStart;
    if (!start || start.id !== event.pointerId) {
      return;
    }

    this.swipeStart = null;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      this.next();
    } else {
      this.previous();
    }
  }

  onSwipeCancel(event: PointerEvent): void {
    if (this.swipeStart?.id === event.pointerId) {
      this.swipeStart = null;
    }
  }

  previous(): void {
    this.select(this.activeIndex() - 1);
  }

  next(): void {
    this.select(this.activeIndex() + 1);
  }

  select(index: number): void {
    this.activeIndex.set((index + this.references.length) % this.references.length);
  }

  cardTransform(index: number): string {
    const offset = this.cardOffset(index);
    return `translateX(calc(-50% + ${offset} * var(--card-spacing))) scale(var(--card-scale))`;
  }

  isVisibleCard(index: number): boolean {
    return Math.abs(this.cardOffset(index)) <= 1;
  }

  cardOffset(index: number): number {
    const difference = index - this.activeIndex();
    const midpoint = Math.floor(this.references.length / 2);

    if (difference > midpoint) {
      return difference - this.references.length;
    }

    if (difference < -midpoint) {
      return difference + this.references.length;
    }

    return difference;
  }
}
