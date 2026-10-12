import { Component, signal } from '@angular/core';
import { PreviewOverlay } from '../preview-overlay/preview-overlay';
import { PROJECTS, type ProjectPreview } from './projects.data';

export interface PreviewOrigin {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
}

@Component({
  selector: 'projects',
  imports: [PreviewOverlay],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly projects = PROJECTS;
  readonly selectedProject = signal<ProjectPreview | null>(null);
  readonly previewOrigin = signal<PreviewOrigin | null>(null);

  openPreview(project: ProjectPreview, preview: HTMLImageElement): void {
    const { top, left, width, height } = preview.getBoundingClientRect();
    this.previewOrigin.set({ top, left, width, height });
    this.selectedProject.set(project);
  }

  closePreview(): void {
    this.selectedProject.set(null);
    this.previewOrigin.set(null);
  }
}
