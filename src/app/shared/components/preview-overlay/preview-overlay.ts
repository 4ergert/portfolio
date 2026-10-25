import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal, input, output, viewChild } from '@angular/core';
import type { PreviewOrigin } from '../projects/projects';
import type { ProjectPreview } from '../projects/projects.data';
import { LanguageService } from '../../language-switcher/language.service';

@Component({
  selector: 'app-preview-overlay',
  imports: [],
  templateUrl: './preview-overlay.html',
  styleUrl: './preview-overlay.scss',
})
export class PreviewOverlay implements AfterViewInit, OnDestroy {
  readonly i18n = inject(LanguageService);
  readonly project = input.required<ProjectPreview>();
  readonly origin = input.required<PreviewOrigin>();
  readonly closed = output<void>();
  readonly nextProject = output<void>();
  readonly dialog = viewChild.required<ElementRef<HTMLElement>>('dialog');
  readonly content = viewChild.required<ElementRef<HTMLElement>>('content');
  readonly projectImage = viewChild.required<ElementRef<HTMLImageElement>>('projectImage');
  readonly isReady = signal(false);
  readonly isAdvancing = signal(false);
  readonly isScrollPending = signal(false);
  private compactViewport!: MediaQueryList;
  private contentResizeObserver!: ResizeObserver;
  private animationFrameId: number | undefined;
  private lockedScrollY = 0;

  ngAfterViewInit(): void {
    this.lockPageScroll();

    const dialog = this.dialog().nativeElement;
    dialog.focus();
    dialog.addEventListener('keydown', this.onDialogKeydown);

    this.compactViewport = window.matchMedia('(max-width: 950px)');
    this.compactViewport.addEventListener('change', this.updateScrollState);
    this.contentResizeObserver = new ResizeObserver(this.updateScrollState);
    const content = this.content().nativeElement;
    this.contentResizeObserver.observe(content);
    for (const child of content.children) {
      this.contentResizeObserver.observe(child);
    }
    this.updateScrollState();

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
    this.unlockPageScroll();
    this.dialog().nativeElement.removeEventListener('keydown', this.onDialogKeydown);
    this.compactViewport.removeEventListener('change', this.updateScrollState);
    this.contentResizeObserver.disconnect();
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private lockPageScroll(): void {
    this.lockedScrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.lockedScrollY}px`;
    document.body.style.width = '100%';
  }

  private unlockPageScroll(): void {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo({ top: this.lockedScrollY, behavior: 'instant' });
  }

  private readonly onDialogKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.close()
    }
  };

  close(): void {
    this.closed.emit();
  }

  readonly updateScrollState = (): void => {
    const content = this.content().nativeElement;
    this.isScrollPending.set(
      this.compactViewport.matches &&
      content.scrollHeight - content.clientHeight - content.scrollTop > 2,
    );
  };

  advance(): void {
    if (this.isScrollPending()) {
      const content = this.content().nativeElement;
      content.scrollTo({
        top: content.scrollHeight,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
      return;
    }

    this.isAdvancing.set(true);
    this.nextProject.emit();
    this.content().nativeElement.scrollTop = 0;
    this.updateScrollState();
  }

  resetAdvanceFeedback(): void {
    this.isAdvancing.set(false);
  }
}
