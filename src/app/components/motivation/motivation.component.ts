import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOTIVATION_MESSAGES, MotivationMessage } from '../../data/motivation-messages';
import { FocusTimerComponent } from '../focus-timer/focus-timer.component';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-motivation',
  standalone: true,
  imports: [CommonModule, FocusTimerComponent],
  templateUrl: './motivation.component.html',
  styleUrl: './motivation.component.css'
})
export class MotivationComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentMotivation = signal<MotivationMessage>(MOTIVATION_MESSAGES[0]);
  currentIndex = signal<number>(0);

  checklist = signal<ChecklistItem[]>([
    { id: 1, text: 'Pick one topic to focus on without judging how long it took in the past.', completed: false },
    { id: 2, text: 'Study for 25 minutes with full presence (using the timer below).', completed: false },
    { id: 3, text: 'Take a short 5-minute break (stretch, water, look away from paper).', completed: false },
    { id: 4, text: 'Revise the main 3 points or write a quick summary recall.', completed: false },
    { id: 5, text: 'Celebrate the small win: one topic closer to MD!', completed: false },
  ]);

  allCompleted = signal<boolean>(false);

  ngOnInit(): void {
    this.getRandomMotivation();
  }

  getRandomMotivation(): void {
    let nextIdx = Math.floor(Math.random() * MOTIVATION_MESSAGES.length);
    if (nextIdx === this.currentIndex() && MOTIVATION_MESSAGES.length > 1) {
      nextIdx = (nextIdx + 1) % MOTIVATION_MESSAGES.length;
    }
    this.currentIndex.set(nextIdx);
    this.currentMotivation.set(MOTIVATION_MESSAGES[nextIdx]);
    this.cdr.markForCheck();
  }

  toggleChecklistItem(id: number): void {
    this.checklist.update(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );

    const isAll = this.checklist().every(item => item.completed);
    this.allCompleted.set(isAll);
    this.cdr.markForCheck();
  }

  resetChecklist(): void {
    this.checklist.update(items =>
      items.map(item => ({ ...item, completed: false }))
    );
    this.allCompleted.set(false);
    this.cdr.markForCheck();
  }
}
