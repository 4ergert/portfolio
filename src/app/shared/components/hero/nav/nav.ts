import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageSwitcher } from '../../../language-switcher/language-switcher';
import { LanguageService } from '../../../language-switcher/language.service';

@Component({
  selector: 'app-nav',
  imports: [LanguageSwitcher, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Nav {
  readonly i18n = inject(LanguageService);
  readonly isMenuOpen = signal(false);
  private readonly menu = viewChild.required<ElementRef<HTMLElement>>('menu');
  private readonly menuToggle = viewChild.required<ElementRef<HTMLButtonElement>>('menuToggle');

  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen()) {
      return;
    }

    const path = event.composedPath();
    if (!path.includes(this.menu().nativeElement) && !path.includes(this.menuToggle().nativeElement)) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(isOpen => !isOpen);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
