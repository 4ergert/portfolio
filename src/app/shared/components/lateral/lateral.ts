import { Component, inject } from '@angular/core';
import { LanguageService } from '../../language-switcher/language.service';

@Component({
  selector: 'lateral',
  imports: [],
  templateUrl: './lateral.html',
  styleUrl: './lateral.scss',
})
export class Lateral {
  readonly i18n = inject(LanguageService);

  scrollToFooter(): void {
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth';
    const footer = document.querySelector('app-footer');
    if (footer) {
      footer.scrollIntoView({ behavior, block: 'end' });
      return;
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
  }
}
