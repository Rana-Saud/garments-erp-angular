import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  getItems() {
    const items = [
      { sku: 'LTH-001', description: 'Sheep Vegas 0.7-0.75', qty: 120, location: 'A1' },
      { sku: 'LTH-002', description: 'Cow Grain 1.0', qty: 50, location: 'B2' },
      { sku: 'TRM-001', description: 'Zip Fasteners', qty: 500, location: 'C3' }
    ];
    return of(items);
  }
}
