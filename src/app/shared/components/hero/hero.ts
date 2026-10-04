import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../language-switcher/language-switcher';

@Component({
  selector: 'hero',
  imports: [LanguageSwitcher],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
