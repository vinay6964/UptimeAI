import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../../../core/github.service';
import { UserProfileComponent } from '../../components/user-profile/user-profile';
import { finalize } from 'rxjs/operators';
import { RepoListComponent } from '../../components/repo-list/repo-list';
import { Subscription } from 'rxjs';
import { ContributionGraphComponent } from '../../components/contribution-graph/contribution-graph';
import { ActivityOverviewComponent } from '../../components/activity-overview/activity-overview';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, UserProfileComponent, RepoListComponent, ContributionGraphComponent, ActivityOverviewComponent],
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  profileData: any = null;
  loading: boolean = true;
  error: string | null = null;
  activeTab: string = 'overview';
  private searchSubscription!: Subscription;

  // 2. Inject ChangeDetectorRef here
  constructor(
    private githubService: GithubService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchProfile('shreeramk');

    this.searchSubscription = this.githubService.search$.subscribe((username) => {
      this.fetchProfile(username);
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  fetchProfile(username: string) {
    this.loading = true;

    this.githubService.getProfile(username)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (data) => {
          // Mock Achievements (API doesn't provide these easily, so we mock them for display)
          data.achievements = this.getMockAchievements();

          this.profileData = data;
          this.githubService.updateCurrentUser(data);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('API Error:', err);
          this.error = 'Failed to load profile';
          this.cdr.detectChanges();
        }
      });
  }

  private getMockAchievements() {
    return [
      {
        name: 'Pull Shark',
        image: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png'
      },
      {
        name: 'YOLO',
        image: 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png'
      },
      {
        name: 'Quickdraw',
        image: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png',
        badge: 'x4',
        badgeColor: 'bg-blue-500'
      }
    ];
  }
}