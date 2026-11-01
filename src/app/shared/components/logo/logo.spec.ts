import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logo } from './logo';
import { vi } from 'vitest';

describe('Logo', () => {
  let fixture: ComponentFixture<Logo>;
  let host: HTMLElement;
  let resolveFont: (faces: object[]) => void;
  let originalFonts: PropertyDescriptor | undefined;

  beforeEach(async () => {
    originalFonts = Object.getOwnPropertyDescriptor(document, 'fonts');
    const loaded = new Promise<object[]>(resolve => { resolveFont = resolve; });
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: { load: vi.fn(() => loaded) },
    });
    await TestBed.configureTestingModule({ imports: [Logo] }).compileComponents();
    fixture = TestBed.createComponent(Logo);
    host = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    if (originalFonts) {
      Object.defineProperty(document, 'fonts', originalFonts);
    } else {
      Reflect.deleteProperty(document, 'fonts');
    }
  });

  it('waits for the logo font before revealing the initials', async () => {
    expect(host.classList.contains('logo--font-ready')).toBe(false);
    resolveFont([{}]);
    await vi.waitFor(() => expect(fixture.componentInstance.fontReady()).toBe(true));
    fixture.detectChanges();
    expect(host.classList.contains('logo--font-ready')).toBe(true);
  });

  it('renders an accessible logo without image assets', () => {
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Julian Hergert – Frontend Developer');
    expect(host.querySelector('.logo')?.getAttribute('aria-hidden')).toBe('true');
    expect(host.querySelector('.logo__initials')?.textContent).toBe('JH');
    expect(host.querySelector('.logo__name')?.textContent).toBe('Julian Hergert');
    expect(host.querySelector('img, svg, picture')).toBeNull();
  });

  it('enables the footer-specific responsive variant', () => {
    expect(host.classList.contains('logo--footer')).toBe(false);
    fixture.componentRef.setInput('variant', 'footer');
    fixture.detectChanges();
    expect(host.classList.contains('logo--footer')).toBe(true);
  });
});
