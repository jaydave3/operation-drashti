import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAPPINESS_MISSIONS, HappinessMission } from '../../data/happiness-missions';

@Component({
  selector: 'app-happiness-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './happiness-challenge.component.html',
  styleUrl: './happiness-challenge.component.css'
})
export class HappinessChallengeComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentMission = signal<HappinessMission>(HAPPINESS_MISSIONS[0]);
  currentIndex = signal<number>(0);
  isCompleted = signal<boolean>(false);
  completedCount = signal<number>(0);
  showCelebration = signal<boolean>(false);

  ngOnInit(): void {
    this.getRandomMission();
  }

  getRandomMission(): void {
    let nextIdx = Math.floor(Math.random() * HAPPINESS_MISSIONS.length);
    if (nextIdx === this.currentIndex() && HAPPINESS_MISSIONS.length > 1) {
      nextIdx = (nextIdx + 1) % HAPPINESS_MISSIONS.length;
    }
    this.currentIndex.set(nextIdx);
    this.currentMission.set(HAPPINESS_MISSIONS[nextIdx]);
    this.isCompleted.set(false);
    this.showCelebration.set(false);
    this.cdr.markForCheck();
  }

  markCompleted(): void {
    if (this.isCompleted()) return;
    this.isCompleted.set(true);
    this.completedCount.update(c => c + 1);
    this.showCelebration.set(true);
    this.cdr.markForCheck();
  }
}
