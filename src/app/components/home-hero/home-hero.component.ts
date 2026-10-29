import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeatureCard {
  title: string;
  emoji: string;
  description: string;
  targetId: string;
  badge: string;
  btnLabel: string;
}

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.css'
})
export class HomeHeroComponent {
  features: FeatureCard[] = [
    {
      title: 'Emergency Smile Kit',
      emoji: '😂',
      description: 'Prescription nonsense, relatable overthinking jokes & instant giggles for long study days.',
      targetId: 'smile-kit',
      badge: 'Rx Nonsense',
      btnLabel: 'Open Smile Kit'
    },
    {
      title: 'MD Exam Motivation',
      emoji: '🩺',
      description: 'Grounding reminders, syllabus peace of mind, and a 25-minute Pomodoro study focus timer.',
      targetId: 'md-motivation',
      badge: 'Future Doctor',
      btnLabel: 'Get Motivated'
    },
    {
      title: 'Random Compliment Dept',
      emoji: '💗',
      description: 'Gentle truths and genuine reminders of your strength, warmth, and resilience.',
      targetId: 'compliments',
      badge: 'Friendly Truths',
      btnLabel: 'Receive Compliment'
    },
    {
      title: 'Tiny Happiness Challenge',
      emoji: '🌈',
      description: 'Zero-pressure micro-missions designed to make your mind feel at least 1% lighter.',
      targetId: 'happiness-challenge',
      badge: 'Feel 1% Better',
      btnLabel: 'Start Challenge'
    }
  ];

  funGreetings = [
    'System status: 100% operational & sending good energy ✨',
    'Official notice: Studying is important, but Drashti is more important 💖',
    'Chai level check: Highly recommended right now ☕',
    'Fun fact: Your brain has mastered more concepts than you give it credit for 🌟'
  ];

  currentGreetingIndex = signal(0);

  cycleGreeting(): void {
    this.currentGreetingIndex.update(idx => (idx + 1) % this.funGreetings.length);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
