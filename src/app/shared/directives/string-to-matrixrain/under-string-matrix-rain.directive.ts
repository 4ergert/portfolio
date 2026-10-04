import { Directive, ElementRef, OnDestroy, Renderer2, RendererStyleFlags2, inject } from '@angular/core';

/**
 * Animates a text container dissolving into decorative matrix rain on hover or focus.
 *
 * @remarks
 * Import this standalone directive into the consuming component and load the global
 * styles from the colocated `_matrix-rain.scss`. CSS controls the color transition,
 * dissolution, falling characters, and reduced-motion behavior.
 *
 * The host must support child elements, and its ancestors must allow the rain to
 * overflow. Existing child nodes are moved, not cloned, to preserve their bindings
 * and event handlers. Only the decorative rain is hidden from assistive technology.
 * Rain columns are sized once, on the first activation.
 *
 * @example
 * ```html
 * <a appMatrixRain href="#projects">Projects</a>
 * ```
 */
@Directive({
  selector: '[appMatrixRain]',
  host: {
    '(pointerenter)': 'onPointerEnter()',
    '(pointerleave)': 'onPointerLeave()',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class UnderStringMatrixRainDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private rain: HTMLElement | null = null;
  private label: HTMLElement | null = null;
  private hovering = false;
  private focused = false;
  private changedPosition = false;
  private originalPosition = '';
  private originalPositionPriority = '';

  /** Activates the effect while the pointer is over the host. */
  onPointerEnter(): void {
    this.hovering = true;
    this.updateRain();
  }

  /** Ends pointer activation without interrupting an effect retained by focus. */
  onPointerLeave(): void {
    this.hovering = false;
    this.updateRain();
  }

  /** Activates the effect when the host or a descendant receives focus. */
  onFocusIn(): void {
    this.focused = true;
    this.updateRain();
  }

  /**
   * Ends focus activation only when focus leaves the host and its descendants.
   *
   * @param event - Focus event whose related target identifies the next focused node.
   */
  onFocusOut(event: FocusEvent): void {
    this.focused = event.relatedTarget instanceof Node && this.host.contains(event.relatedTarget);
    this.updateRain();
  }

  /**
   * Removes generated elements, unwraps the original child nodes, and restores
   * the inline positioning value and priority if this directive changed them.
   */
  ngOnDestroy(): void {
    if (this.rain) {
      this.renderer.removeChild(this.host, this.rain);
    }
    if (this.label) {
      while (this.label.firstChild) {
        this.renderer.insertBefore(this.host, this.label.firstChild, this.label);
      }
      this.renderer.removeChild(this.host, this.label);
    }
    if (this.changedPosition) {
      this.host.style.setProperty('position', this.originalPosition, this.originalPositionPriority);
    }
  }

  /**
   * Lazily creates the effect and synchronizes its CSS classes with the combined
   * pointer and focus state. Inactive rain remains available for reuse.
   */
  private updateRain(): void {
    const active = this.hovering || this.focused;
    if (active && !this.rain) {
      this.createRain();
    }
    if (this.rain) {
      if (active) {
        this.renderer.addClass(this.rain, 'matrix-rain--active');
        if (this.label) {
          this.renderer.addClass(this.label, 'matrix-rain-label--active');
        }
      } else {
        this.renderer.removeClass(this.rain, 'matrix-rain--active');
        if (this.label) {
          this.renderer.removeClass(this.label, 'matrix-rain-label--active');
        }
      }
    }
  }

  /**
   * Creates the text wrapper and randomized, screen-reader-hidden rain columns.
   *
   * @remarks
   * Static hosts receive relative positioning for the absolute rain overlay.
   * Column count is derived from the initial host width and capped at 60.
   * Reading computed styles establishes the initial state before activation,
   * allowing transitions to run on the first hover.
   *
   * @throws Error - If the host document has no associated browser window.
   */
  private createRain(): void {
    const view = this.host.ownerDocument.defaultView;
    if (!view) {
      throw new Error('Matrix rain requires a browser document.');
    }
    if (view.getComputedStyle(this.host).position === 'static') {
      this.originalPosition = this.host.style.getPropertyValue('position');
      this.originalPositionPriority = this.host.style.getPropertyPriority('position');
      this.renderer.setStyle(this.host, 'position', 'relative');
      this.changedPosition = true;
    }

    const rain: HTMLSpanElement = this.renderer.createElement('span');
    this.renderer.addClass(rain, 'matrix-rain');
    this.renderer.setAttribute(rain, 'aria-hidden', 'true');

    const width = Math.max(40, this.host.getBoundingClientRect().width);
    const label: HTMLSpanElement = this.renderer.createElement('span');
    this.renderer.addClass(label, 'matrix-rain-label');
    // Move the existing nodes so Angular bindings and event handlers stay intact.
    for (const child of Array.from(this.host.childNodes)) {
      this.renderer.appendChild(label, child);
    }
    this.renderer.appendChild(this.host, label);
    this.label = label;

    const columnCount = Math.min(60, Math.ceil(width / 20));
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    for (let index = 0; index < columnCount; index++) {
      const column: HTMLSpanElement = this.renderer.createElement('span');
      const duration = 1300 + Math.random() * 1300;
      const startOffset = ((index + Math.random()) / columnCount) * 96;
      const text = Array.from(
        { length: 8 },
        () => characters[Math.floor(Math.random() * characters.length)],
      ).join('\n');

      this.renderer.addClass(column, 'matrix-rain__column');
      this.renderer.setStyle(
        column,
        '--matrix-rain-start-offset',
        `${startOffset}px`,
        RendererStyleFlags2.DashCase,
      );
      this.renderer.setStyle(column, 'animation-duration', `${duration}ms`);
      this.renderer.setStyle(column, 'animation-delay', `${-Math.random() * duration}ms`);
      this.renderer.appendChild(column, this.renderer.createText(text));
      this.renderer.appendChild(rain, column);
    }

    this.renderer.appendChild(this.host, rain);
    this.rain = rain;
    // Establish the initial styles before activating transitions on the first hover.
    view.getComputedStyle(label).opacity;
    view.getComputedStyle(rain).opacity;
  }
}
