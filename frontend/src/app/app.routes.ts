import { Routes } from '@angular/router';
import { ProfilePageComponent } from './features/profile/pages/profile-page/profile-page';

export const routes: Routes = [
  { path: '', redirectTo: 'profile/shreeramk', pathMatch: 'full' },
  { path: 'profile/:username', component: ProfilePageComponent }
];