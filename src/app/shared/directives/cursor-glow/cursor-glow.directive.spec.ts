import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursorGlowDirective } from './cursor-glow.directive';

@Component({
  imports: [CursorGlowDirective],
  template: '<div appCursorGlow></div>',
})
class TestHost {}

describe('CursorGlowDirective', () => {
  let fixture: ComponentFixture<TestHost>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHost] }).compileComponents();
    fixture = TestBed.createComponent(TestHost);
    host = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('follows mouse movement and ignores touch movement', () => {
    const mouseMove = new Event('pointermove');
    Object.defineProperties(mouseMove, {
      clientX: { value: 120 },
      clientY: { value: 240 },
      pointerType: { value: 'mouse' },
    });
    host.dispatchEvent(mouseMove);

    expect(host.style.getPropertyValue('--cursor-x')).toBe('120px');
    expect(host.style.getPropertyValue('--cursor-y')).toBe('240px');
    expect(host.classList.contains('app-cursor-glow--visible')).toBe(true);

    const touchMove = new Event('pointermove');
    Object.defineProperties(touchMove, {
      clientX: { value: 300 },
      clientY: { value: 400 },
      pointerType: { value: 'touch' },
    });
    host.dispatchEvent(touchMove);

    expect(host.style.getPropertyValue('--cursor-x')).toBe('120px');
    expect(host.style.getPropertyValue('--cursor-y')).toBe('240px');
  });

  it('hides the glow when the pointer leaves the host', () => {
    const pointerMove = new Event('pointermove');
    Object.defineProperties(pointerMove, {
      clientX: { value: 120 },
      clientY: { value: 240 },
      pointerType: { value: 'mouse' },
    });
    host.dispatchEvent(pointerMove);
    host.dispatchEvent(new Event('pointerleave'));

    expect(host.classList.contains('app-cursor-glow--visible')).toBe(false);
  });

  it('stops tracking pointer movement after destruction', () => {
    fixture.destroy();
    const pointerMove = new Event('pointermove');
    Object.defineProperties(pointerMove, {
      clientX: { value: 120 },
      clientY: { value: 240 },
      pointerType: { value: 'mouse' },
    });
    host.dispatchEvent(pointerMove);

    expect(host.style.getPropertyValue('--cursor-x')).toBe('');
    expect(host.classList.contains('app-cursor-glow--visible')).toBe(false);
  });
});
