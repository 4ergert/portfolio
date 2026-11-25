import { Component, inject } from '@angular/core';
import { Nav } from '../../shared/components/hero/nav/nav';
import { Footer } from '../../shared/components/footer/footer';
import { LanguageService } from '../../shared/language-switcher/language.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [Nav, Footer],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {
  readonly i18n = inject(LanguageService);
}
