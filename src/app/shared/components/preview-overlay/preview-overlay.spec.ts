import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { PreviewOverlay } from './preview-overlay';
import { PROJECTS } from '../projects/projects.data';

describe('PreviewOverlay scroll navigation', () => {
  let fixture: ComponentFixture<PreviewOverlay>;
  let component: PreviewOverlay;
  let content: HTMLElement;
  let compact: boolean;
  let mediaChange: () => void;
  let resize: () => void;
  let disconnect: ReturnType<typeof vi.fn>;
  let removeMediaListener: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    compact = true;
    disconnect = vi.fn();
    removeMediaListener = vi.fn();
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(720);
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      get matches() { return compact; },
      addEventListener: (_event: string, callback: () => void) => { mediaChange = callback; },
      removeEventListener: removeMediaListener,
    })));
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: () => void) { resize = callback; }
      observe = vi.fn();
      disconnect = disconnect;
    });
    await TestBed.configureTestingModule({ imports: [PreviewOverlay] }).compileComponents();
    fixture = TestBed.createComponent(PreviewOverlay);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', PROJECTS[0]);
    fixture.componentRef.setInput('origin', { top: 0, left: 0, width: 200, height: 100 });
    fixture.detectChanges();
    content = component.content().nativeElement;
    Object.defineProperties(content, {
      scrollHeight: { configurable: true, value: 1000 },
      clientHeight: { configurable: true, value: 400 },
    });
    content.scrollTo = vi.fn();
    resize();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('shows a downward arrow without text while more content remains', () => {
    const button = fixture.nativeElement.querySelector('.forward_button') as HTMLButtonElement;
    expect(component.isScrollPending()).toBe(true);
    expect(button.classList.contains('forward_button--scroll')).toBe(true);
    expect(button.getAttribute('aria-label')).toBe(component.i18n.translate('projects.scrollDown'));
  });

  it('restores next-project navigation only at the bottom and hides it again on scrolling up', () => {
    content.scrollTop = 597;
    content.dispatchEvent(new Event('scroll'));
    expect(component.isScrollPending()).toBe(true);

    content.scrollTop = 598.6;
    content.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    expect(component.isScrollPending()).toBe(false);
    const button = fixture.nativeElement.querySelector('.forward_button') as HTMLButtonElement;
    expect(button.classList.contains('forward_button--scroll')).toBe(false);
    expect(button.getAttribute('aria-label')).toBe(component.i18n.translate('projects.nextAria'));

    content.scrollTop = 100;
    content.dispatchEvent(new Event('scroll'));
    expect(component.isScrollPending()).toBe(true);
  });

  it('scrolls rather than advancing while content remains', () => {
    const advance = vi.spyOn(component.nextProject, 'emit');
    component.advance();
    expect(content.scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'instant' });
    expect(advance).not.toHaveBeenCalled();
    expect(component.isAdvancing()).toBe(false);
  });

  it('advances at the bottom and resets the scroll position for the next project', () => {
    content.scrollTop = 600;
    component.updateScrollState();
    const advance = vi.spyOn(component.nextProject, 'emit');
    component.advance();
    expect(advance).toHaveBeenCalledOnce();
    expect(content.scrollTop).toBe(0);
    expect(component.isScrollPending()).toBe(true);
  });

  it('preserves desktop navigation and responds to breakpoint changes', () => {
    compact = false;
    mediaChange();
    expect(component.isScrollPending()).toBe(false);
    const advance = vi.spyOn(component.nextProject, 'emit');
    component.advance();
    expect(advance).toHaveBeenCalledOnce();

    compact = true;
    mediaChange();
    expect(component.isScrollPending()).toBe(true);
  });

  it('updates when content fits or grows after resizing or image loading', () => {
    Object.defineProperty(content, 'scrollHeight', { configurable: true, value: 400 });
    resize();
    expect(component.isScrollPending()).toBe(false);
    Object.defineProperty(content, 'scrollHeight', { configurable: true, value: 800 });
    resize();
    expect(component.isScrollPending()).toBe(true);
  });

  it('restores the original page position without smooth scrolling when closed', () => {
    expect(document.body.style.top).toBe('-720px');
    fixture.destroy();
    expect(window.scrollTo).toHaveBeenCalledExactlyOnceWith({ top: 720, behavior: 'instant' });
    expect(document.body.style.position).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('removes media listeners and resize observation when closed', () => {
    fixture.destroy();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(removeMediaListener).toHaveBeenCalledWith('change', component.updateScrollState);
  });
});
