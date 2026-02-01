import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  get() {
    const users = [
      { username: 'admin', role: 'Admin', email: 'admin@example.com' },
      { username: 'operator', role: 'Operator', email: 'operator@example.com' },
      { username: 'qc', role: 'QC', email: 'qc@example.com' }
    ];
    return of(users);
  }
}
