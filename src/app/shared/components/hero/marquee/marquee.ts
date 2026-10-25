import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../language-switcher/language.service';

@Component({
  selector: 'app-marquee',
  imports: [],
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  readonly i18n = inject(LanguageService);
}
