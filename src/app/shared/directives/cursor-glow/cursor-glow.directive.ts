import { Directive, ElementRef, NgZone, OnDestroy, Renderer2, RendererStyleFlags2, inject } from '@angular/core';

@Directive({
  selector: '[appCursorGlow]',
  standalone: true,
})
export class CursorGlowDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);
  private stopPointerMove!: () => void;
  private stopPointerLeave!: () => void;

  constructor() {
    this.renderer.addClass(this.host, 'app-cursor-glow');
    this.zone.runOutsideAngular(() => {
      this.stopPointerMove = this.renderer.listen(this.host, 'pointermove', this.onPointerMove);
      this.stopPointerLeave = this.renderer.listen(
        this.host,
        'pointerleave',
        this.onPointerLeave,
      );
    });
  }

  ngOnDestroy(): void {
    this.stopPointerMove();
    this.stopPointerLeave();
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (event.pointerType === 'touch') {
      return;
    }

    this.renderer.setStyle(
      this.host,
      '--cursor-x',
      `${event.clientX}px`,
      RendererStyleFlags2.DashCase,
    );
    this.renderer.setStyle(
      this.host,
      '--cursor-y',
      `${event.clientY}px`,
      RendererStyleFlags2.DashCase,
    );
    this.renderer.addClass(this.host, 'app-cursor-glow--visible');
  };

  private readonly onPointerLeave = (): void => {
    this.renderer.removeClass(this.host, 'app-cursor-glow--visible');
  };
}
