import { Component } from '@angular/core';
import { UnderStringMatrixRainDirective } from '../../directives/string-to-matrixrain/under-string-matrix-rain.directive';
import { Nav } from './nav/nav';
import { Marquee } from './marquee/marquee';

@Component({
  selector: 'hero',
  imports: [Nav, UnderStringMatrixRainDirective, Marquee],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
