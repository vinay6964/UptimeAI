import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- Import CDR
import { CommonModule } from '@angular/common';
import { GithubService } from '../../../core/github.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  
  searchFocused: boolean = false;
  searchValue: string = '';
  currentUser: any = null; 

  // Inject the service
  constructor(
    private githubService: GithubService,
    private cdr: ChangeDetectorRef // <--- Inject CDR
  ) {}

  ngOnInit() {
    // Subscribe to current user updates
    this.githubService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.cdr.detectChanges(); // Force update to ensure avatar/name renders immediately
    });
  }

  onSearch(event: any) {
    const value = event.target.value;
    if (value) {
      this.githubService.triggerSearch(value);
      this.searchValue = ''; // Clear internal state
      event.target.value = ''; // Clear input visual
      event.target.blur(); // Remove focus to hide keyboard on mobile
      this.searchFocused = false;
    }
  }

  onFocus() {
    this.searchFocused = true;
  }

  onBlur() {
    // Small delay to allow click events if needed, but for simple focus/blur it's fine.
    // If the input is empty, show the placeholder again.
    if (!this.searchValue) {
      this.searchFocused = false;
    }
  }

  onInput(event: any) {
    this.searchValue = event.target.value;
  }
}