import { Component, signal } from '@angular/core';
import { PreviewOverlay } from '../preview-overlay/preview-overlay';
import { PROJECTS, type ProjectPreview } from './projects.data';

@Component({
  selector: 'projects',
  imports: [PreviewOverlay],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly projects = PROJECTS;
  readonly selectedProject = signal<ProjectPreview | null>(null);

  openPreview(project: ProjectPreview): void {
    this.selectedProject.set(project);
  }

  closePreview(): void {
    this.selectedProject.set(null);
  }
}
