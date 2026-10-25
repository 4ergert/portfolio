import { Component, inject } from '@angular/core';
import { LanguageService, type Language } from './language.service';

@Component({
  selector: 'language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  readonly i18n = inject(LanguageService);

  setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }
}
