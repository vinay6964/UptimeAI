import { Component, EventEmitter, Output } from '@angular/core'; // <--- Import EventEmitter & Output
import { CommonModule } from '@angular/common';
import { GithubService } from '../../../core/github.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  
  searchFocused: boolean = false;
  searchValue: string = '';

  // Inject the service
  constructor(private githubService: GithubService) {}

  onSearch(event: any) {
    console.log('1. Header: Enter pressed!', event.target.value); // <--- ADD THIS
    const value = event.target.value;
    if (value) {
      this.githubService.triggerSearch(value);
      this.searchValue = ''; // Clear after search if desired, or keep it.
      // event.target.value = ''; // We are binding to searchValue, so clear that instead if using ngModel, but here we use manual binding.
      // Let's keep manual clearing for now as per original code, but update local state.
      event.target.value = '';
      this.searchValue = '';
      event.target.blur(); // Remove focus
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