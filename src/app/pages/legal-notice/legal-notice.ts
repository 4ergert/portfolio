import { Component } from '@angular/core';
import { Nav } from '../../shared/components/hero/nav/nav';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-legal-notice',
  imports: [Nav, Footer],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {}
