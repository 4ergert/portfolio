import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../../language-switcher/language-switcher';

@Component({
  selector: 'app-nav',
  imports: [LanguageSwitcher],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {}
