import { Component } from '@angular/core';
import { UnderStringMatrixRainDirective } from '../../directives/string-to-matrixrain/under-string-matrix-rain.directive';

@Component({
  selector: 'technologies',
  imports: [UnderStringMatrixRainDirective],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies {}
