import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PackingService {
  get() {
    const list = [
      { shipment: 'SHP-001', woNo: 'WO-1001', qty: 100, status: 'Ready' },
      { shipment: 'SHP-002', woNo: 'WO-1002', qty: 120, status: 'Packed' }
    ];
    return of(list);
  }
}
