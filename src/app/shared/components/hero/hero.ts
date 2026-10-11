import { Component } from '@angular/core';
import { LanguageSwitcher } from '../../language-switcher/language-switcher';
import { UnderStringMatrixRainDirective } from '../../directives/string-to-matrixrain/under-string-matrix-rain.directive';
import { Nav } from './nav/nav';

@Component({
  selector: 'hero',
  imports: [Nav, UnderStringMatrixRainDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
