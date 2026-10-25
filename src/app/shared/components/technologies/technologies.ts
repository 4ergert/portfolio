import { Component, inject } from '@angular/core';
import { UnderStringMatrixRainDirective } from '../../directives/string-to-matrixrain/under-string-matrix-rain.directive';
import { LanguageService } from '../../language-switcher/language.service';

@Component({
  selector: 'technologies',
  imports: [UnderStringMatrixRainDirective],
  templateUrl: './technologies.html',
  styleUrl: './technologies.scss',
})
export class Technologies {
  readonly i18n = inject(LanguageService);
}
