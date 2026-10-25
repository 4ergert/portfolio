import { Component, inject, signal } from '@angular/core';
import { LanguageSwitcher } from '../../../language-switcher/language-switcher';
import { LanguageService } from '../../../language-switcher/language.service';

@Component({
  selector: 'app-nav',
  imports: [LanguageSwitcher],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  readonly i18n = inject(LanguageService);
  readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(isOpen => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
