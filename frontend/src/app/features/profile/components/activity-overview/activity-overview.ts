import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-overview.html',
})
export class ActivityOverviewComponent implements OnChanges {
  @Input() stats: any;

  // Center coordinate
  cx = 200;
  cy = 150;
  radius = 100;

  ngOnChanges() {
    // React to changes if needed in future
  }

  /**
   * Calculates the SVG coordinates for a given data point.
   * Uses a radar chart logic:
   * Index 0: Top (Review)
   * Index 1: Right (Issues)
   * Index 2: Bottom (PRs)
   * Index 3: Left (Commits)
   */
  getPoint(index: number) {
    if (!this.stats) return { x: this.cx, y: this.cy };

    const {
      totalCommitContributions: commits,
      totalIssueContributions: issues,
      totalPullRequestContributions: prs,
      totalPullRequestReviewContributions: reviews
    } = this.stats;

    const total = (commits + issues + prs + reviews) || 1;
    
    const values = [reviews, issues, prs, commits];
    const val = values[index];
    let ratio = val / total;
    const armLength = this.radius * Math.sqrt(ratio);
    
    let x = this.cx;
    let y = this.cy;

    if (index === 0) { y -= armLength; }
    if (index === 1) { x += armLength; }
    if (index === 2) { y += armLength; }
    if (index === 3) { x -= armLength; }

    return { x, y };
  }

  getPolygonPoints() {
    const p0 = this.getPoint(0);
    const p1 = this.getPoint(1);
    const p2 = this.getPoint(2);
    const p3 = this.getPoint(3);
    return `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  }

  getPercentage(val: number) {
    if (!this.stats) return 0;
    const {
        totalCommitContributions,
        totalIssueContributions,
        totalPullRequestContributions,
        totalPullRequestReviewContributions
      } = this.stats;
      const total = totalCommitContributions + totalIssueContributions + totalPullRequestContributions + totalPullRequestReviewContributions;
      return total ? Math.round((val / total) * 100) : 0;
  }
}
