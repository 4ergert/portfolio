import { Component, signal } from '@angular/core';

interface Reference {
  quote: string;
  author: string;
  role: string;
}

@Component({
  selector: 'references',
  imports: [],
  templateUrl: './references.html',
  styleUrl: './references.scss',
})
export class References {
  private readonly cardSpacing = 600;

  readonly references: Reference[] = [
    {
      quote: 'Placeholder reference: Julian approaches challenges with care, communicates clearly, and always looks for practical solutions.',
      author: 'Sample colleague',
      role: 'Project partner',
    },
    {
      quote: 'Placeholder reference: Julian is a reliable team member whose technical skills and proactive approach contribute to successful projects.',
      author: 'Sample colleague',
      role: 'Team partner',
    },
    {
      quote: 'Placeholder reference: Working with Julian was a positive experience. He stayed focused, open to feedback, and committed to quality.',
      author: 'Sample colleague',
      role: 'Development partner',
    },
    {
      quote: 'Placeholder reference: Julian combines an analytical mindset with creativity and persistence when solving complex tasks.',
      author: 'Sample colleague',
      role: 'Project collaborator',
    },
  ];

  readonly activeIndex = signal(0);

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
    const scale = index === this.activeIndex() ? 1.1 : 1;
    return `translateX(calc(-50% + ${offset * this.cardSpacing}px)) scale(${scale})`;
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
