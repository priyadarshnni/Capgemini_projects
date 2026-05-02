import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStats } from '../models/user-stats';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="stats-container">
      <h3>StatsComponent (Default Strategy)</h3>
      <div class="stat">Score: {{ userStats.score }}</div>
      <div class="stat">Level: {{ userStats.level }}</div>
      <div class="achievements">
        <strong>Achievements:</strong>
        <ul>
          <li *ngFor="let achievement of userStats.achievements">{{ achievement }}</li>
        </ul>
      </div>
      <p class="note">✓ This component updates because it uses Default strategy</p>
    </div>
  `,
  styles: [`
    .stats-container {
      border: 2px solid #4CAF50;
      padding: 15px;
      border-radius: 5px;
      background: #f0f7f0;
      margin-top: 15px;
    }
    .stat {
      font-size: 16px;
      margin: 8px 0;
      font-weight: 500;
    }
    .achievements {
      margin-top: 10px;
    }
    .achievements ul {
      margin: 5px 0 0 20px;
    }
    .note {
      color: #2196F3;
      font-size: 13px;
      margin-top: 10px;
      font-style: italic;
    }
  `]
})
export class StatsComponent {
  @Input() userStats!: UserStats;
}
