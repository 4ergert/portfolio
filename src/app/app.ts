import { Component, signal } from '@angular/core';
import { Header } from './shared/components/header/header';
import { AboutMe } from './shared/components/about-me/about-me';
import { Technologies } from './shared/components/technologies/technologies';
import { Projects } from './shared/components/projects/projects';
import { References } from './shared/components/references/references';
import { ContactMe } from './shared/components/contact-me/contact-me';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, AboutMe, Technologies, Projects, References, ContactMe, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
