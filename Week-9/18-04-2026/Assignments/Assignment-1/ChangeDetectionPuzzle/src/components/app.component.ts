import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UserStats } from '../models/user-stats';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div class="app-container">
      <header>
        <h1>Angular Change Detection Puzzle</h1>
        <p class="subtitle">Understanding Default vs OnPush Strategies</p>
      </header>

      <main>
        <div class="explanation">
          <h2>The Problem:</h2>
          <div class="problem-box">
            <p>
              <strong>Component Hierarchy:</strong><br>
              AppComponent (Default) → DashboardComponent (OnPush) → StatsComponent (Default)
            </p>
            <p>
              When we mutate userStats.score inside DashboardComponent, the view doesn't update
              because OnPush strategy doesn't detect property mutations on objects.
            </p>
            <p>
              However, StatsComponent (which is a child with Default strategy) DOES update because
              Default strategy runs change detection on every zone event.
            </p>
          </div>
        </div>

        <div class="answers">
          <h2>Answering to the Questions within the site:</h2>
          
          <div class="answer-box">
            <h3>a) Why DashboardComponent doesn't update (3 marks)</h3>
            <div class="answer-content">
              <p>DashboardComponent uses OnPush strategy, which only runs change detection when:</p>
              <ul>
                <li><strong>&#64;Input() reference changes</strong> (object replaced, not mutated)</li>
                <li><strong>An event is triggered</strong> within the component (click, input, etc.)</li>
                <li><strong>ChangeDetectorRef.markForCheck() or detectChanges()</strong> is called</li>
                <li><strong>An observable &#64;Input()</strong> emits a new value</li>
              </ul>
              <p>
                Since we mutated the object in-place (this.userStats.score = 100), the object reference
                didn't change, so OnPush strategy doesn't trigger change detection.
              </p>
            </div>
          </div>

          <div class="answer-box">
            <h3>b) Why StatsComponent shows updated value (3 marks)</h3>
            <div class="answer-content">
              <p>
                StatsComponent uses the <strong>Default strategy</strong>, which runs change detection
                on every zone event (async operations, user events, etc.).
              </p>
              <p>
                Even though the object reference didn't change, the mutation still happened in memory.
                When Default strategy runs its change detection cycle, it reads the current values
                from the object, so it sees the updated score and reflects it in the template.
              </p>
            </div>
          </div>

          <div class="answer-box">
            <h3>c) How to fix without changing to Default (4 marks)</h3>
            <div class="answer-content">
              <p>There are 3 main solutions:</p>
              <ol>
                <li>
                  <strong>Use ChangeDetectorRef.markForCheck():</strong><br>
                  Call this.cdr.markForCheck() after mutating. This marks the component
                  for check in the next change detection cycle.
                </li>
                <li>
                  <strong>Use ChangeDetectorRef.detectChanges():</strong><br>
                  Call this.cdr.detectChanges() to immediately run change detection for this component
                  tree without waiting for the next cycle.
                </li>
                <li>
                  <strong>Create a new object reference (Immutable pattern):</strong><br>
                  Create a new object using spread operator instead of mutating.
                  OnPush detects when &#64;Input() references change, triggering detection.
                </li>
              </ol>
            </div>
          </div>
        </div>

        <app-dashboard [userStats]="userStats"></app-dashboard>
      </main>

      <footer>
        <p>© 2026 Angular Change Detection Puzzle - Educational Demo</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 20px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 30px;
    }

    header h1 {
      margin: 0;
      font-size: 32px;
    }

    .subtitle {
      margin: 10px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }

    main {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 30px;
    }

    .explanation {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0f0f0;
    }

    .problem-box {
      background: #fffacd;
      border-left: 4px solid #fbc02d;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }

    .problem-box p {
      margin: 10px 0;
      line-height: 1.6;
    }

    .answers h2 {
      color: #333;
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .answer-box {
      background: #f5f5f5;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }

    .answer-box h3 {
      color: #667eea;
      margin-top: 0;
    }

    .answer-content {
      margin: 15px 0 0 0;
    }

    .answer-content ul, .answer-content ol {
      margin: 10px 0;
      padding-left: 20px;
    }

    .answer-content li {
      margin: 8px 0;
      line-height: 1.6;
    }

    .answer-content p {
      margin: 10px 0;
      line-height: 1.6;
    }

    footer {
      text-align: center;
      padding: 20px 0;
      color: #999;
      font-size: 12px;
      border-top: 1px solid #f0f0f0;
      margin-top: 30px;
    }

    h2 {
      color: #333;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
  `]
})
export class AppComponent {
  userStats: UserStats = {
    score: 50,
    level: 5,
    achievements: ['First Step', 'Quick Learner']
  };
}
