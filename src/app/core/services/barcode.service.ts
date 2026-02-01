import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({ providedIn: 'root' })
export class BarcodeService {
  private api = inject(BaseApiService);

  saveScans(items: Array<any>): Observable<any> {
    // default endpoint - adjust as needed
    return this.api.post('scans', { items });
  }
}
