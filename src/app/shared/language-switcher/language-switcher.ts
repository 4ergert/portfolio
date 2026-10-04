import { Component, model } from '@angular/core';

@Component({
  selector: 'language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  readonly language = model<'en' | 'de'>('en');
}
