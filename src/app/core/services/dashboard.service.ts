import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getSummary(): Observable<any> {
    const data = {
      totalOrders: 45,
      workOrdersOpen: 12,
      inventoryLow: 5,
      qcFails: 3,
      ordersByDay: [
        { day: 'Mon', produced: 120, defects: 3 },
        { day: 'Tue', produced: 95, defects: 5 },
        { day: 'Wed', produced: 110, defects: 2 },
        { day: 'Thu', produced: 130, defects: 6 },
        { day: 'Fri', produced: 80, defects: 3 }
      ],
      inventoryDistribution: [
        { name: 'Leather', value: 70 },
        { name: 'Trims', value: 20 },
        { name: 'Other', value: 10 }
      ]
    };
    return of(data);
  }

  // sync helper for template
  getSummarySync() { return { totalOrders: 45, workOrdersOpen: 12, inventoryLow: 5, qcFails: 3 }; }
}
