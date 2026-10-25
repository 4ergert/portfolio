import { TestBed } from '@angular/core/testing';
import { References } from './references';

describe('References swipe navigation', () => {
  let component: References;

  const pointer = (
    clientX: number,
    clientY = 100,
    pointerId = 1,
    pointerType = 'touch',
    isPrimary = true,
  ): PointerEvent => new PointerEvent('pointerdown', {
    clientX, clientY, pointerId, pointerType, isPrimary,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [References] });
    component = TestBed.createComponent(References).componentInstance;
  });

  it('advances on a left swipe and goes back on a right swipe', () => {
    component.onSwipeStart(pointer(200));
    component.onSwipeEnd(pointer(160));
    expect(component.activeIndex()).toBe(1);

    component.onSwipeStart(pointer(100));
    component.onSwipeEnd(pointer(140));
    expect(component.activeIndex()).toBe(0);
  });

  it('wraps from the first card to the last card', () => {
    component.onSwipeStart(pointer(100));
    component.onSwipeEnd(pointer(180));
    expect(component.activeIndex()).toBe(component.references.length - 1);
  });

  it('ignores taps, short swipes, and predominantly vertical gestures', () => {
    for (const [x, y] of [[200, 100], [161, 100], [150, 200], [150, 150]]) {
      component.onSwipeStart(pointer(200));
      component.onSwipeEnd(pointer(x, y));
      expect(component.activeIndex()).toBe(0);
    }
  });

  it('ignores mouse and non-primary touch input', () => {
    component.onSwipeStart(pointer(200, 100, 1, 'mouse'));
    component.onSwipeEnd(pointer(100));
    component.onSwipeStart(pointer(200, 100, 1, 'touch', false));
    component.onSwipeEnd(pointer(100));
    expect(component.activeIndex()).toBe(0);
  });

  it('resets cancelled gestures and processes each gesture only once', () => {
    component.onSwipeStart(pointer(200));
    component.onSwipeCancel(pointer(200));
    component.onSwipeEnd(pointer(100));
    expect(component.activeIndex()).toBe(0);

    component.onSwipeStart(pointer(200));
    component.onSwipeEnd(pointer(100));
    component.onSwipeEnd(pointer(50));
    expect(component.activeIndex()).toBe(1);
  });

  it('ignores end and cancellation events from another pointer', () => {
    component.onSwipeStart(pointer(200));
    component.onSwipeEnd(pointer(100, 100, 2));
    component.onSwipeCancel(pointer(100, 100, 2));
    expect(component.activeIndex()).toBe(0);
    component.onSwipeEnd(pointer(100));
    expect(component.activeIndex()).toBe(1);
  });
});
