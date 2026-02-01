import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkOrderService {
  getList() {
    const list = [
      { id: 1, woNo: 'WO-1001', style: 'Leather Jacket A', qty: 200, progress: 45 },
      { id: 2, woNo: 'WO-1002', style: 'Leather Jacket B', qty: 120, progress: 10 },
      { id: 3, woNo: 'WO-1003', style: 'Leather Jacket C', qty: 80, progress: 75 }
    ];
    return of(list);
  }
}
