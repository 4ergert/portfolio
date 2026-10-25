import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Nav } from './nav';

describe('Nav menu', () => {
  let fixture: ComponentFixture<Nav>;
  let toggle: HTMLButtonElement;
  let menu: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Nav], providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    toggle = host.querySelector<HTMLButtonElement>('.nav_bar__menu-toggle')!;
    menu = host.querySelector<HTMLElement>('.nav_bar__menu')!;
  });

  it('opens and closes through the toggle, including its child elements', () => {
    toggle.querySelector('span')!.click();
    expect(fixture.componentInstance.isMenuOpen()).toBe(true);
    toggle.click();
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('closes on a click outside the navigation', () => {
    toggle.click();
    document.body.click();
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('closes on a click outside the menu but inside the navigation', () => {
    toggle.click();
    const host: HTMLElement = fixture.nativeElement;
    host.querySelector<HTMLElement>('.nav_bar__logo')!.click();
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('stays open when clicking inside the menu or changing language', () => {
    toggle.click();
    menu.click();
    expect(fixture.componentInstance.isMenuOpen()).toBe(true);
    menu.querySelector<HTMLButtonElement>('button[lang="de"]')!.click();
    expect(fixture.componentInstance.isMenuOpen()).toBe(true);
    expect(fixture.componentInstance.i18n.language()).toBe('de');
  });

  it('still closes with Escape', () => {
    toggle.click();
    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('leaves the menu closed when clicking outside', () => {
    document.body.click();
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });

  it('links the logo to the home page and closes the menu', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/?from=legal-notice');
    toggle.click();
    const host: HTMLElement = fixture.nativeElement;
    const logo = host.querySelector<HTMLAnchorElement>('a.nav_bar__logo')!;
    expect(logo.getAttribute('href')).toBe('/');
    logo.click();
    await fixture.whenStable();
    expect(router.url).toBe('/');
    expect(fixture.componentInstance.isMenuOpen()).toBe(false);
  });
});
