import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Shared {
  private navbarActionSource = new BehaviorSubject<string>('home');
  navbarAction$ = this.navbarActionSource.asObservable();
  updateNavbarAction(action: string) {
    this.navbarActionSource.next(action);
  }
}
