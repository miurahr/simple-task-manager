import { Observable, of } from 'rxjs';
import { Event } from '@angular/router';

export class MockRouter {
  public events = new Observable<Event>();

  navigate(commands: any[]) {
    return of(true).toPromise();
  }
}
