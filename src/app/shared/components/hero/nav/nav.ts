import { Component, signal } from '@angular/core';
import { LanguageSwitcher } from '../../../language-switcher/language-switcher';

@Component({
  selector: 'app-nav',
  imports: [LanguageSwitcher],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(isOpen => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
