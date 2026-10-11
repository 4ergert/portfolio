import { Component, signal } from '@angular/core';
import { PreviewOverlay, type ProjectPreview } from '../preview-overlay/preview-overlay';

@Component({
  selector: 'projects',
  imports: [PreviewOverlay],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly selectedProject = signal<ProjectPreview | null>(null);

  openPreview(project: ProjectPreview): void {
    this.selectedProject.set(project);
  }

  closePreview(): void {
    this.selectedProject.set(null);
  }
}
