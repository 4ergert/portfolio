import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../language-switcher/language-switcher';
import { UnderStringMatrixRainDirective } from '../../directives/string-to-matrixrain/under-string-matrix-rain.directive';

@Component({
  selector: 'hero',
  imports: [LanguageSwitcher, UnderStringMatrixRainDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
