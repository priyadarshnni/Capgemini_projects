import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStats } from '../models/user-stats';
import { StatsComponent } from './stats.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-container">
      <h2>DashboardComponent (OnPush Strategy - Has the Problem)</h2>
      
      <div class="current-stats">
        <div class="stat">Score: <span class="score-value">{{ userStats.score }}</span></div>
        <div class="stat">Level: {{ userStats.level }}</div>
      </div>

      <div class="button-group">
        <h3>Solutions to Fix Without Changing to Default:</h3>
        
        <button (click)="solution1_UpdateLocally()" class="btn btn-problem">
          ❌ Problem: Mutate Directly (No Update)
        </button>

        <button (click)="solution2_MarkForCheck()" class="btn btn-fix">
          ✓ Solution 1: ChangeDetectorRef.markForCheck()
        </button>

        <button (click)="solution3_DetectChanges()" class="btn btn-fix">
          ✓ Solution 2: ChangeDetectorRef.detectChanges()
        </button>

        <button (click)="solution4_ImmutablePattern()" class="btn btn-fix">
          ✓ Solution 3: Create New Reference (Immutable)
        </button>

        <button (click)="resetStats()" class="btn btn-reset">
          Reset Stats
        </button>
      </div>

      <div class="info-panel">
        <p><strong>Last Action:</strong> {{ lastAction }}</p>
        <p><strong>View Updated:</strong> {{ viewUpdated ? '✓ Yes' : '✗ No' }}</p>
      </div>

      <!-- Child component with Default strategy -->
      <app-stats [userStats]="userStats"></app-stats>
    </div>
  `,
  styles: [`
    .dashboard-container {
      border: 2px solid #FF9800;
      padding: 20px;
      border-radius: 5px;
      background: #fff3e0;
      margin: 20px 0;
    }
    
    .current-stats {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
      border-left: 4px solid #FF9800;
    }
    
    .stat {
      font-size: 18px;
      margin: 10px 0;
      font-weight: 500;
    }
    
    .score-value {
      color: #FF9800;
      font-size: 22px;
      font-weight: bold;
    }
    
    .button-group {
      margin: 20px 0;
      padding: 15px;
      background: white;
      border-radius: 4px;
    }
    
    .button-group h3 {
      margin-top: 0;
      color: #333;
    }
    
    .btn {
      display: block;
      width: 100%;
      padding: 12px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-problem {
      background: #f44336;
      color: white;
    }
    
    .btn-problem:hover {
      background: #d32f2f;
      transform: translateX(5px);
    }
    
    .btn-fix {
      background: #4CAF50;
      color: white;
    }
    
    .btn-fix:hover {
      background: #45a049;
      transform: translateX(5px);
    }
    
    .btn-reset {
      background: #2196F3;
      color: white;
    }
    
    .btn-reset:hover {
      background: #0b7dda;
      transform: translateX(5px);
    }
    
    .info-panel {
      background: #e3f2fd;
      border-left: 4px solid #2196F3;
      padding: 12px;
      border-radius: 4px;
      margin: 15px 0;
      font-size: 14px;
    }
    
    .info-panel p {
      margin: 5px 0;
    }
  `]
})
export class DashboardComponent {
  @Input() userStats!: UserStats;
  @ViewChild(StatsComponent) statsComponent!: StatsComponent;

  lastAction = 'None';
  viewUpdated = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // Problem: This does NOT update the view in OnPush strategy
  solution1_UpdateLocally() {
    this.lastAction = '❌ Mutated directly (view NOT updated)';
    this.viewUpdated = false;
    this.userStats.score = 100;
  }

  // Solution 1: Use ChangeDetectorRef.markForCheck()
  // Marks this component for check in next change detection cycle
  solution2_MarkForCheck() {
    this.lastAction = '✓ Used ChangeDetectorRef.markForCheck()';
    this.viewUpdated = true;
    this.userStats.score = 200;
    this.cdr.markForCheck();
  }

  // Solution 2: Use ChangeDetectorRef.detectChanges()
  // Runs change detection immediately for this component tree
  solution3_DetectChanges() {
    this.lastAction = '✓ Used ChangeDetectorRef.detectChanges()';
    this.viewUpdated = true;
    this.userStats.score = 300;
    this.cdr.detectChanges();
  }

  // Solution 3: Create new reference (Immutable pattern)
  // OnPush detects when @Input references change
  solution4_ImmutablePattern() {
    this.lastAction = '✓ Created new object reference (Immutable)';
    this.viewUpdated = true;
    this.userStats = { ...this.userStats, score: 400 };
  }

  resetStats() {
    this.lastAction = 'Reset';
    this.viewUpdated = false;
    this.userStats = {
      score: 50,
      level: 5,
      achievements: ['First Step', 'Quick Learner']
    };
    this.cdr.markForCheck();
  }
}
