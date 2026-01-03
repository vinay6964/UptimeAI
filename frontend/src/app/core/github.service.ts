import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; // <--- Import Subject

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'http://localhost:5001/api/user';
  
  // 1. Create a "Search Channel"
  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) { }

  // 2. Method for the Header to call
  triggerSearch(username: string) {
    console.log('2. Service: transmitting search for', username); // <--- ADD THIS
    this.searchSubject.next(username);
  }

  getProfile(username: string): Observable<any> {
    const uniqueUrl = `${this.apiUrl}/${username}?t=${Date.now()}`;
    return this.http.get<any>(uniqueUrl);
  }
}