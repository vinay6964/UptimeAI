import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = environment.apiUrl;

  // 1. Create a "Search Channel"
  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  // 2. Create a "Current User Channel" to share profile data with Header
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 3. Method for the Header to call
  triggerSearch(username: string) {
    this.searchSubject.next(username);
  }

  // 4. Update the current user state
  updateCurrentUser(profile: any) {
    this.currentUserSubject.next(profile);
  }

  getProfile(username: string): Observable<any> {
    const uniqueUrl = `${this.apiUrl}/${username}?t=${Date.now()}`;
    return this.http.get<any>(uniqueUrl);
  }
}