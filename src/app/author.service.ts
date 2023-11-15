
import { Injectable } from '@angular/core';
import { xyz } from 'db';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authorDataSubject = new BehaviorSubject<any>(null);

  constructor() {}

  getAuthorData(): Observable<any> {
    // Simulate an HTTP request
    return of(xyz);
  }

  updateAuthorData(newData: any): void {
    this.authorDataSubject.next(newData);
  }

  getAuthorDataObservable(): Observable<any> {
    return this.authorDataSubject.asObservable();
  }
}