import { AfterViewInit, Component, ElementRef, OnDestroy, input, output, viewChild } from '@angular/core';

export interface ProjectPreview {
  title: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-preview-overlay',
  imports: [],
  templateUrl: './preview-overlay.html',
  styleUrl: './preview-overlay.scss',
})
export class PreviewOverlay implements AfterViewInit, OnDestroy {
  readonly project = input.required<ProjectPreview>();
  readonly closed = output<void>();
  readonly dialog = viewChild.required<ElementRef<HTMLElement>>('dialog');

  ngAfterViewInit(): void {
    const dialog = this.dialog().nativeElement;
    dialog.focus();
    dialog.addEventListener('keydown', this.onDialogKeydown);
  }

  ngOnDestroy(): void {
    this.dialog().nativeElement.removeEventListener('keydown', this.onDialogKeydown);
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
