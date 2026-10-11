import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'contact-me',
  imports: [RouterLink],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss',
})
export class ContactMe {
  readonly nameMissing = signal(false);
  readonly emailMissing = signal(false);
  readonly messageMissing = signal(false);
  readonly consentMissing = signal(false);

  onSubmit(event: SubmitEvent, name: string, email: string, message: string, consentAccepted: boolean): void {
    event.preventDefault();
    this.nameMissing.set(name.trim().length === 0);
    this.emailMissing.set(email.trim().length === 0);
    this.messageMissing.set(message.trim().length === 0);
    this.consentMissing.set(!consentAccepted);
  }

  clearNameError(): void {
    this.nameMissing.set(false);
  }

  clearEmailError(): void {
    this.emailMissing.set(false);
  }

  clearMessageError(): void {
    this.messageMissing.set(false);
  }

  clearConsentError(): void {
    this.consentMissing.set(false);
  }
}
