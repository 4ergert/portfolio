import { Component, inject, signal } from '@angular/core';
import { PreviewOverlay } from '../preview-overlay/preview-overlay';
import { PROJECTS, type ProjectPreview } from './projects.data';
import { LanguageService } from '../../language-switcher/language.service';

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
  readonly i18n = inject(LanguageService);
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

  showNextProject(): void {
    const currentProject = this.selectedProject();

    if (!currentProject) {
      return;
    }

    const currentIndex = this.projects.findIndex(project => project.id === currentProject.id);

    if (currentIndex === -1) {
      throw new Error(`Unknown project: ${currentProject.id}`);
    }

    this.selectedProject.set(this.projects[(currentIndex + 1) % this.projects.length]);
  }
}
