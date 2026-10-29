import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LAB_JOKES, LabJoke } from '../../data/joke-lab';

@Component({
  selector: 'app-joke-lab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joke-lab.component.html',
  styleUrl: './joke-lab.component.css'
})
export class JokeLabComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentJoke = signal<LabJoke>(LAB_JOKES[0]);
  currentIndex = signal<number>(0);
  selectedRating = signal<number | null>(null);
  feedbackMessage = signal<string>('');
  showPunchline = signal<boolean>(true);

  ngOnInit(): void {
    this.testRandomJoke();
  }

  testRandomJoke(): void {
    let nextIdx = Math.floor(Math.random() * LAB_JOKES.length);
    if (nextIdx === this.currentIndex() && LAB_JOKES.length > 1) {
      nextIdx = (nextIdx + 1) % LAB_JOKES.length;
    }
    this.currentIndex.set(nextIdx);
    this.currentJoke.set(LAB_JOKES[nextIdx]);
    this.selectedRating.set(null);
    this.feedbackMessage.set('');
    this.showPunchline.set(true);
    this.cdr.markForCheck();
  }

  rateJoke(stars: number): void {
    this.selectedRating.set(stars);

    if (stars <= 2) {
      const lowResponses = [
        `Rating of ${stars}/5 recorded. 📉 Bug ticket #404 created: "Jay's humor algorithm requires urgent firmware upgrade."`,
        `Ouch! A ${stars}/5! Jay is currently writing an official apology letter to the medical council. 🩺📝`,
        `${stars}/5? Tough crowd! Change detection triggered. We will rollback to a more amusing branch immediately.`
      ];
      this.feedbackMessage.set(lowResponses[Math.floor(Math.random() * lowResponses.length)]);
    } else if (stars === 3) {
      this.feedbackMessage.set(
        `3/5: Medically stable! Not fatal, not miraculous, but sufficiently goofy to maintain vital signs. 🧪`
      );
    } else {
      const highResponses = [
        `Breakthrough! A ${stars}/5 rating! 🚀 Clinical trial deemed an overwhelming therapeutic triumph!`,
        `High score: ${stars}/5! 🌟 Jay's self-esteem just jumped by 300%. The joke writer receives a virtual trophy!`,
        `${stars}/5! Drashti has approved this prescription. Instant mood enhancement confirmed!`
      ];
      this.feedbackMessage.set(highResponses[Math.floor(Math.random() * highResponses.length)]);
    }
    this.cdr.markForCheck();
  }
}
