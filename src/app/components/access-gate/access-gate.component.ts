import { Component, EventEmitter, Output, signal, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../../config/app-config';

@Component({
  selector: 'app-access-gate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access-gate.component.html',
  styleUrl: './access-gate.component.css'
})
export class AccessGateComponent {
  @Output() unlocked = new EventEmitter<void>();

  private cdr = inject(ChangeDetectorRef);

  passcode = '';
  showPasscode = signal(false);
  errorMessage = signal('');
  isSuccess = signal(false);
  showHint = signal(false);
  readonly hintText = APP_CONFIG.hint;

  togglePasscodeVisibility(): void {
    this.showPasscode.update(v => !v);
  }

  toggleHint(): void {
    this.showHint.update(v => !v);
  }

  onSubmit(): void {
    const enteredPass = (this.passcode || '').trim();

    if (!enteredPass) {
      this.errorMessage.set('Please enter the secret code to unlock your surprise! 👀');
      this.cdr.markForCheck();
      return;
    }

    // Check against accepted variations without logging credentials to console
    const normalized = enteredPass.toUpperCase();
    const isValid = APP_CONFIG.acceptedPasscodes.some(code => code.toUpperCase() === normalized);

    if (isValid) {
      this.errorMessage.set('');
      this.isSuccess.set(true);
      this.cdr.markForCheck();

      // Playful unlock animation delay before transitioning
      setTimeout(() => {
        this.unlocked.emit();
        this.cdr.markForCheck();
      }, 600);
    } else {
      this.errorMessage.set('Hmm, that secret code doesn’t seem quite right. Need a clue? Click the hint below! 🌸');
      this.cdr.markForCheck();
    }
  }
}
