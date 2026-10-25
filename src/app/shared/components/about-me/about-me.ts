import { Component, inject } from '@angular/core';
import { LanguageService } from '../../language-switcher/language.service';

@Component({
  selector: 'about-me',
  imports: [],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  readonly i18n = inject(LanguageService);
}
