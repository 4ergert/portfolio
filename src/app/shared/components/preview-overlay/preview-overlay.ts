import { AfterViewInit, Component, ElementRef, OnDestroy, signal, input, output, viewChild } from '@angular/core';
import type { PreviewOrigin } from '../projects/projects';
import type { ProjectPreview } from '../projects/projects.data';

@Component({
  selector: 'app-preview-overlay',
  imports: [],
  templateUrl: './preview-overlay.html',
  styleUrl: './preview-overlay.scss',
})
export class PreviewOverlay implements AfterViewInit, OnDestroy {
  readonly project = input.required<ProjectPreview>();
  readonly origin = input.required<PreviewOrigin>();
  readonly closed = output<void>();
  readonly dialog = viewChild.required<ElementRef<HTMLElement>>('dialog');
  readonly projectImage = viewChild.required<ElementRef<HTMLImageElement>>('projectImage');
  readonly isReady = signal(false);
  private animationFrameId: number | undefined;

  ngAfterViewInit(): void {
    const dialog = this.dialog().nativeElement;
    dialog.focus();
    dialog.addEventListener('keydown', this.onDialogKeydown);

    const image = this.projectImage().nativeElement;
    const target = image.getBoundingClientRect();
    const origin = this.origin();
    image.style.setProperty('--origin-x', `${origin.left - target.left}px`);
    image.style.setProperty('--origin-y', `${origin.top - target.top}px`);
    image.style.setProperty('--origin-scale-x', `${origin.width / target.width}`);
    image.style.setProperty('--origin-scale-y', `${origin.height / target.height}`);

    this.animationFrameId = requestAnimationFrame(() => this.isReady.set(true));
  }

  ngOnDestroy(): void {
    this.dialog().nativeElement.removeEventListener('keydown', this.onDialogKeydown);
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private readonly onDialogKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  close(): void {
    this.closed.emit();
  }
}
