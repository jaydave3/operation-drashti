import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPLIMENT_MESSAGES, ComplimentItem } from '../../data/compliments';

@Component({
  selector: 'app-compliment-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compliment-generator.component.html',
  styleUrl: './compliment-generator.component.css'
})
export class ComplimentGeneratorComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentCompliment = signal<ComplimentItem>(COMPLIMENT_MESSAGES[0]);
  currentIndex = signal<number>(0);
  complimentCount = signal<number>(1);
  copied = signal<boolean>(false);

  ngOnInit(): void {
    this.getNextCompliment();
  }

  getNextCompliment(): void {
    let nextIdx = Math.floor(Math.random() * COMPLIMENT_MESSAGES.length);
    if (nextIdx === this.currentIndex() && COMPLIMENT_MESSAGES.length > 1) {
      nextIdx = (nextIdx + 1) % COMPLIMENT_MESSAGES.length;
    }
    this.currentIndex.set(nextIdx);
    this.currentCompliment.set(COMPLIMENT_MESSAGES[nextIdx]);
    this.complimentCount.update(c => c + 1);
    this.copied.set(false);
    this.cdr.markForCheck();
  }

  copyCompliment(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.currentCompliment().text);
      this.copied.set(true);
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied.set(false);
        this.cdr.markForCheck();
      }, 2000);
    }
  }
}
