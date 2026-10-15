import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ContactFormResponse {
  success: boolean;
}

@Component({
  selector: 'contact-me',
  imports: [RouterLink],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss',
})
export class ContactMe {
  private readonly http = inject(HttpClient);

  readonly nameMissing = signal(false);
  readonly emailMissing = signal(false);
  readonly messageMissing = signal(false);
  readonly consentMissing = signal(false);
  readonly sending = signal(false);
  readonly submitMessage = signal('');
  readonly submitSucceeded = signal(false);

  onSubmit(
    event: SubmitEvent,
    name: string,
    email: string,
    message: string,
    consentAccepted: boolean,
    emailIsValid: boolean,
  ): void {
    event.preventDefault();
    const nameIsMissing = name.trim().length === 0;
    const emailIsMissing = email.trim().length === 0;
    const messageIsMissing = message.trim().length === 0;

    this.nameMissing.set(nameIsMissing);
    this.emailMissing.set(emailIsMissing || !emailIsValid);
    this.messageMissing.set(messageIsMissing);
    this.consentMissing.set(!consentAccepted);
    this.submitMessage.set('');
    this.submitSucceeded.set(false);

    if (nameIsMissing || emailIsMissing || !emailIsValid || messageIsMissing || !consentAccepted || this.sending()) {
      return;
    }

    this.sending.set(true);
    this.http.post<ContactFormResponse>('/api/contact-form-mail.php', {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }).subscribe({
      next: (response) => {
        if (response?.success !== true) {
          this.submitMessage.set('Your message could not be sent. Please try again later.');
          return;
        }

        this.submitSucceeded.set(true);
        this.submitMessage.set('Thanks! Your message has been sent.');
        if (event.currentTarget instanceof HTMLFormElement) {
          event.currentTarget.reset();
        }
      },
      error: () => {
        this.submitMessage.set('Your message could not be sent. Please try again later.');
        this.sending.set(false);
      },
      complete: () => this.sending.set(false),
    });
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
