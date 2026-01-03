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
  
  // Inject the service
  constructor(private githubService: GithubService) {}

  onSearch(event: any) {
    console.log('1. Header: Enter pressed!', event.target.value); // <--- ADD THIS
    const value = event.target.value;
    if (value) {
      this.githubService.triggerSearch(value);
      event.target.value = '';
    }
  }
}