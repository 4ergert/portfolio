import { Component } from '@angular/core';
import { AboutMe } from '../../shared/components/about-me/about-me';
import { ContactMe } from '../../shared/components/contact-me/contact-me';
import { Footer } from '../../shared/components/footer/footer';
import { Hero } from '../../shared/components/hero/hero';
import { Lateral } from '../../shared/components/lateral/lateral';
import { Projects } from '../../shared/components/projects/projects';
import { References } from '../../shared/components/references/references';
import { Technologies } from '../../shared/components/technologies/technologies';

@Component({
  selector: 'app-home',
  imports: [Hero, AboutMe, Technologies, Projects, References, ContactMe, Footer, Lateral],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
