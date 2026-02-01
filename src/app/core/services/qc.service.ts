import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QcService {
  get() {
    const items = [
      { woNo: 'WO-1001', style: 'Leather Jacket A', inspected: 80, failed: 3 },
      { woNo: 'WO-1003', style: 'Leather Jacket C', inspected: 60, failed: 2 }
    ];
    return of(items);
  }
}
