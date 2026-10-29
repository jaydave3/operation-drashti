import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INITIAL_JAY_NOTE, PersonalNote, SILLY_JAY_NOTES } from '../../data/personal-notes';

@Component({
  selector: 'app-jay-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jay-note.component.html',
  styleUrl: './jay-note.component.css'
})
export class JayNoteComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentNote = signal<PersonalNote>(INITIAL_JAY_NOTE);
  isInitialNote = signal<boolean>(true);
  sillyIndex = signal<number>(-1);

  ngOnInit(): void {
    this.currentNote.set(INITIAL_JAY_NOTE);
    this.isInitialNote.set(true);
  }

  showNextSillyNote(): void {
    let nextIdx = (this.sillyIndex() + 1) % SILLY_JAY_NOTES.length;
    this.sillyIndex.set(nextIdx);
    this.currentNote.set(SILLY_JAY_NOTES[nextIdx]);
    this.isInitialNote.set(false);
    this.cdr.markForCheck();
  }

  resetToInitial(): void {
    this.currentNote.set(INITIAL_JAY_NOTE);
    this.isInitialNote.set(true);
    this.sillyIndex.set(-1);
    this.cdr.markForCheck();
  }
}
