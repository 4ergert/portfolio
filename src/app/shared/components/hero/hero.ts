import { Component, inject } from '@angular/core';
import { UnderStringMatrixRainDirective } from '../../directives/string-to-matrixrain/under-string-matrix-rain.directive';
import { LanguageService } from '../../language-switcher/language.service';
import { Nav } from './nav/nav';
import { Marquee } from './marquee/marquee';

@Component({
  selector: 'hero',
  imports: [Nav, UnderStringMatrixRainDirective, Marquee],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly i18n = inject(LanguageService);
}
