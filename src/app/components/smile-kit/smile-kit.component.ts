import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMERGENCY_JOKES, JokeItem } from '../../data/jokes';

@Component({
  selector: 'app-smile-kit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smile-kit.component.html',
  styleUrl: './smile-kit.component.css'
})
export class SmileKitComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentJoke = signal<JokeItem>(EMERGENCY_JOKES[0]);
  jokeIndex = signal<number>(0);
  reactionFeedback = signal<string>('');
  laughCount = signal<number>(0);
  eyeRollCount = signal<number>(0);
  isPrescribed = signal<boolean>(false);

  ngOnInit(): void {
    this.prescribeRandomJoke();
  }

  prescribeRandomJoke(): void {
    let nextIdx = Math.floor(Math.random() * EMERGENCY_JOKES.length);
    if (nextIdx === this.jokeIndex() && EMERGENCY_JOKES.length > 1) {
      nextIdx = (nextIdx + 1) % EMERGENCY_JOKES.length;
    }
    this.jokeIndex.set(nextIdx);
    this.currentJoke.set(EMERGENCY_JOKES[nextIdx]);
    this.reactionFeedback.set('');
    this.isPrescribed.set(true);
    this.cdr.markForCheck();
  }

  onLaughReaction(): void {
    this.laughCount.update(c => c + 1);
    const feedbackList = [
      'Prescription successful! Serotonin levels officially rising! 🎉',
      'The algorithm accepts your laugh! Jay has gained +5 coding confidence.',
      'That’s the smile we needed! Keep that glow intact, doctor sahab.',
      'Mission Accomplished: Drashti smirk detected by our clinical sensors! ✨'
    ];
    this.reactionFeedback.set(feedbackList[Math.floor(Math.random() * feedbackList.length)]);
    this.cdr.markForCheck();
  }

  onEyeRollReaction(): void {
    this.eyeRollCount.update(c => c + 1);
    const feedbackList = [
      'Noted! Jay has been sent to the joke rehabilitation center for further training. 📝',
      'Valid criticism. Jay will consult his junior joke committee immediately! 🧐',
      'At least an eye roll exercises your ocular muscles! Medical student approved. 👁️',
      'Hey, bad jokes build character! Click "Make It Funnier" for the next attempt. 🫡'
    ];
    this.reactionFeedback.set(feedbackList[Math.floor(Math.random() * feedbackList.length)]);
    this.cdr.markForCheck();
  }
}
