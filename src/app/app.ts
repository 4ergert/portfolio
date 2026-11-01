import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorGlowDirective } from './shared/directives/cursor-glow/cursor-glow.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  hostDirectives: [CursorGlowDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
