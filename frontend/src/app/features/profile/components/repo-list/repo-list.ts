import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-list.html',
  styleUrls: ['./repo-list.scss']
})
export class RepoListComponent {
  @Input() repos: any[] = []; // We will pass the 'nodes' array here
}