import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarcodeService } from '../../../core/services/barcode.service';

@Component({
  selector: 'scan-grid',
  templateUrl: './scan-grid.html',
  styleUrl: './scan-grid.scss',
  imports: [CommonModule, FormsModule]
})
export class ScanGrid {
  @Input() scans: Array<any> = [];

  bs = inject(BarcodeService);

  remove(index: number) {
    this.scans.splice(index, 1);
  }

  apply(index: number) {
    const s = this.scans[index];
    if (!s) return;
    const val = s.value;
    // copy to clipboard and emit global event that generator listens to
    if (navigator && (navigator as any).clipboard) {
      (navigator as any).clipboard.writeText(val).catch(() => {});
    }
    window.dispatchEvent(new CustomEvent('barcode:apply', { detail: val }));
    alert('Scanned value applied to generator and copied to clipboard');
  }

  copy(index: number) {
    const s = this.scans[index];
    if (!s) return;
    const val = s.value;
    if (navigator && (navigator as any).clipboard) {
      (navigator as any).clipboard.writeText(val).then(() => alert('Copied to clipboard')).catch(() => alert('Copy failed'));
    } else {
      alert('Clipboard not available');
    }
  }

  clear() {
    this.scans = [];
  }

  save() {
    if (!this.scans || this.scans.length === 0) {
      alert('No scans to save');
      return;
    }

    this.bs.saveScans(this.scans).subscribe({
      next: () => {
        alert('Scans saved successfully');
        this.clear();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to save scans');
      }
    });
  }
}
