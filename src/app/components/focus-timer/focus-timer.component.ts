import { Component, OnDestroy, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

type TimerMode = 'study' | 'break';

@Component({
  selector: 'app-focus-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './focus-timer.component.html',
  styleUrl: './focus-timer.component.css'
})
export class FocusTimerComponent implements OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  readonly STUDY_TIME = 25 * 60; // 25 minutes in seconds
  readonly BREAK_TIME = 5 * 60;  // 5 minutes in seconds

  currentMode = signal<TimerMode>('study');
  timeLeft = signal<number>(this.STUDY_TIME);
  isRunning = signal<boolean>(false);
  completionMessage = signal<string>('');

  private intervalId: any = null;

  ngOnDestroy(): void {
    this.clearInterval();
  }

  get formattedTime(): string {
    const totalSeconds = this.timeLeft();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString());
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  get progressPercentage(): number {
    const maxTime = this.currentMode() === 'study' ? this.STUDY_TIME : this.BREAK_TIME;
    const elapsed = maxTime - this.timeLeft();
    return Math.min(100, Math.max(0, (elapsed / maxTime) * 100));
  }

  setMode(mode: TimerMode): void {
    this.clearInterval();
    this.isRunning.set(false);
    this.currentMode.set(mode);
    this.timeLeft.set(mode === 'study' ? this.STUDY_TIME : this.BREAK_TIME);
    this.completionMessage.set('');
    this.cdr.markForCheck();
  }

  startTimer(): void {
    if (this.isRunning()) return;

    this.isRunning.set(true);
    this.completionMessage.set('');
    this.cdr.markForCheck();

    this.intervalId = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(t => t - 1);
        this.cdr.markForCheck();
      } else {
        this.onTimerComplete();
      }
    }, 1000);
  }

  pauseTimer(): void {
    this.clearInterval();
    this.isRunning.set(false);
    this.cdr.markForCheck();
  }

  resetTimer(): void {
    this.clearInterval();
    this.isRunning.set(false);
    this.timeLeft.set(this.currentMode() === 'study' ? this.STUDY_TIME : this.BREAK_TIME);
    this.completionMessage.set('');
    this.cdr.markForCheck();
  }

  private onTimerComplete(): void {
    this.clearInterval();
    this.isRunning.set(false);

    if (this.currentMode() === 'study') {
      this.completionMessage.set('🎉 Fantastic work, Dr. Drashti! 25 minutes done! Time for a refreshing 5-minute break.');
    } else {
      this.completionMessage.set('☕ Break completed! Ready to tackle the next small step whenever you feel ready.');
    }
    this.cdr.markForCheck();
  }

  private clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
