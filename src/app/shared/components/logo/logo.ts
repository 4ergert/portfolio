import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';

/** HTML/CSS logo; the variant preserves navigation and footer symbol breakpoints. */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  host: {
    'role': 'img',
    'aria-label': 'Julian Hergert – Frontend Developer',
    '[class.logo--footer]': 'variant() === "footer"',
    '[class.logo--font-ready]': 'fontReady()',
  },
})

export class Logo {
  readonly variant = input<'navigation' | 'footer'>('navigation');
  readonly fontReady = signal(false);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const fonts = this.document.fonts;
      if (!fonts) {
        console.error('The logo requires the browser Font Loading API.');
        return;
      }
      Promise.all([400, 700, 800].map(weight => fonts.load(`${weight} 16px "Karla"`)))
        .then(faces => {
          if (faces.some(result => result.length === 0)) {
            throw new Error('The Karla font required by the logo is unavailable.');
          }
          if (!this.destroyRef.destroyed) {
            this.fontReady.set(true);
          }
        })
        .catch(error => console.error('Failed to load the logo font.', error));
    });
  }
}