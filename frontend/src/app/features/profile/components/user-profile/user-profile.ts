import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile', // This must match the tag in your HTML
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent {
  @Input() profile: any; // <--- This line is required to receive the data!
}