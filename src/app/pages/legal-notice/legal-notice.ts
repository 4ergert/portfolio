import { Component, inject } from '@angular/core';
import { Nav } from '../../shared/components/hero/nav/nav';
import { Footer } from '../../shared/components/footer/footer';
import { LanguageService } from '../../shared/language-switcher/language.service';

@Component({
  selector: 'app-legal-notice',
  imports: [Nav, Footer],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {
  readonly i18n = inject(LanguageService);
}
