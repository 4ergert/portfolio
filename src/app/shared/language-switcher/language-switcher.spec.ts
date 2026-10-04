import { TestBed } from '@angular/core/testing';
import { LanguageSwitcher } from './language-switcher';

describe('LanguageSwitcher', () => {
  it('starts with English selected and switches in both directions', async () => {
    const fixture = TestBed.createComponent(LanguageSwitcher);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const buttons = element.querySelectorAll('button');
    const indicator = element.querySelector('.language-switcher__indicator');

    expect(fixture.componentInstance.language()).toBe('en');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('false');

    buttons[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.language()).toBe('de');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(indicator?.classList.contains('language-switcher__indicator--de')).toBe(true);

    buttons[0].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.language()).toBe('en');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(indicator?.classList.contains('language-switcher__indicator--de')).toBe(false);
  });
});
