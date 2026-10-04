import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UnderStringMatrixRainDirective } from './under-string-matrix-rain.directive';

@Component({
  imports: [UnderStringMatrixRainDirective],
  template: '<button appMatrixRain style="position: static">Projects</button>',
})
class TestHost {}

describe('UnderStringMatrixRainDirective', () => {
  it('assigns distinct vertical start offsets within a 96px range', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    element.querySelector('button')!.dispatchEvent(new Event('pointerenter'));
    const columns = element.querySelectorAll<HTMLElement>('.matrix-rain__column');
    const offsets = Array.from(columns, column =>
      parseFloat(column.style.getPropertyValue('--matrix-rain-start-offset')),
    );

    expect(offsets.length).toBeGreaterThanOrEqual(2);
    expect(new Set(offsets).size).toBe(offsets.length);
    offsets.forEach(offset => {
      expect(offset).toBeGreaterThanOrEqual(0);
      expect(offset).toBeLessThan(96);
    });
    fixture.destroy();
  });

  it('shows decorative rain on hover, reuses it, and preserves the text', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;

    expect(button.querySelector('.matrix-rain')).toBeNull();
    button.dispatchEvent(new Event('pointerenter'));
    const rain = button.querySelector('.matrix-rain')!;
    const label = button.querySelector('.matrix-rain-label')!;

    expect(rain.getAttribute('aria-hidden')).toBe('true');
    expect(rain.classList.contains('matrix-rain--active')).toBe(true);
    expect(rain.querySelectorAll('.matrix-rain__column').length).toBeGreaterThanOrEqual(2);
    expect(button.firstChild?.textContent).toBe('Projects');
    expect(label.classList.contains('matrix-rain-label--active')).toBe(true);
    expect(button.style.position).toBe('relative');
    expect(rain.querySelector('.matrix-rain__column')?.textContent?.split('\n')).toHaveLength(8);
    for (const column of rain.querySelectorAll('.matrix-rain__column')) {
      expect(column.textContent).toMatch(/^[\u30A2-\u30F3](?:\n[\u30A2-\u30F3]){7}$/);
    }

    button.dispatchEvent(new Event('pointerleave'));
    expect(rain.classList.contains('matrix-rain--active')).toBe(false);
    expect(label.classList.contains('matrix-rain-label--active')).toBe(false);
    button.dispatchEvent(new Event('pointerenter'));
    expect(button.querySelectorAll('.matrix-rain')).toHaveLength(1);

    fixture.destroy();
    expect(button.querySelector('.matrix-rain')).toBeNull();
    expect(button.querySelector('.matrix-rain-label')).toBeNull();
    expect(button.textContent).toBe('Projects');
    expect(button.style.position).toBe('static');
  });

  it('keeps rain active while either keyboard focus or hover remains', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;

    button.dispatchEvent(new FocusEvent('focusin'));
    const rain = button.querySelector('.matrix-rain')!;
    expect(rain.classList.contains('matrix-rain--active')).toBe(true);

    button.dispatchEvent(new Event('pointerenter'));
    button.dispatchEvent(new Event('pointerleave'));
    expect(rain.classList.contains('matrix-rain--active')).toBe(true);
    button.dispatchEvent(new FocusEvent('focusout'));
    expect(rain.classList.contains('matrix-rain--active')).toBe(false);

    button.dispatchEvent(new Event('pointerenter'));
    button.dispatchEvent(new FocusEvent('focusin'));
    button.dispatchEvent(new FocusEvent('focusout'));
    expect(rain.classList.contains('matrix-rain--active')).toBe(true);
    button.dispatchEvent(new Event('pointerleave'));
    expect(rain.classList.contains('matrix-rain--active')).toBe(false);
    fixture.destroy();
  });

  it('preserves existing positioned hosts', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;
    button.style.position = 'absolute';
    button.dispatchEvent(new Event('pointerenter'));
    expect(button.style.position).toBe('absolute');
    fixture.destroy();
    expect(button.style.position).toBe('absolute');
  });

  it('preserves live text nodes and their updates during the effect', async () => {
    const fixture = TestBed.createComponent(TestHost);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('button')!;
    const text = button.firstChild!;
    button.dispatchEvent(new Event('pointerenter'));
    expect(button.querySelector('.matrix-rain-label')?.firstChild).toBe(text);
    text.textContent = 'Projekte';
    expect(button.querySelector('.matrix-rain-label')?.textContent).toBe('Projekte');
    fixture.destroy();
    expect(button.firstChild).toBe(text);
  });
});
