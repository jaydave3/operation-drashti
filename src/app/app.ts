import { Component, signal, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessGateComponent } from './components/access-gate/access-gate.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { SmileKitComponent } from './components/smile-kit/smile-kit.component';
import { MotivationComponent } from './components/motivation/motivation.component';
import { ComplimentGeneratorComponent } from './components/compliment-generator/compliment-generator.component';
import { HappinessChallengeComponent } from './components/happiness-challenge/happiness-challenge.component';
import { JokeLabComponent } from './components/joke-lab/joke-lab.component';
import { JayNoteComponent } from './components/jay-note/jay-note.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AccessGateComponent,
    AppHeaderComponent,
    HomeHeroComponent,
    SmileKitComponent,
    MotivationComponent,
    ComplimentGeneratorComponent,
    HappinessChallengeComponent,
    JokeLabComponent,
    JayNoteComponent,
    AppFooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private cdr = inject(ChangeDetectorRef);
  isUnlocked = signal<boolean>(false);

  onUnlock(): void {
    this.isUnlocked.set(true);
    this.cdr.markForCheck();
    // Smoothly scroll to top of main page when unlocked
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
