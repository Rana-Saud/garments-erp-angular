import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'barcode-generator',
  templateUrl: './barcode-generator.html',
  styleUrl: './barcode-generator.scss',
  imports: [CommonModule, FormsModule]
})
export class BarcodeGenerator {
  @ViewChild('barcode', { static: false }) barcodeEl!: ElementRef<SVGElement>;
  @ViewChild('labelPreview', { static: false }) labelPreview!: ElementRef<HTMLElement>;

  fields: any = {
    customerPo: '',
    custReference: '',
    styleModel: '',
    leather: '',
    color: '',
    size: '',
    barcode: ''
  };

  barcodeValue = '';

  _applyListener = (e: any) => this.applyParsedScan(e.detail);

  constructor() {
    // listen for applied scans from scan-grid; do not assume a direct parent relationship
    window.addEventListener('barcode:apply', this._applyListener as EventListener);
  }

  render() {
    // Prefer an explicit barcode value, otherwise use style/model or a timestamp-based fallback
    this.barcodeValue = (this.fields.barcode && this.fields.barcode.trim()) || (this.fields.styleModel && this.fields.styleModel.trim()) || String(Date.now()).slice(-8);

    if (!this.barcodeEl) return;

    try {
      JsBarcode(this.barcodeEl.nativeElement, this.barcodeValue, {
        format: 'CODE128',
        width: 2,
        height: 60,
        displayValue: false,
        margin: 6
      });
    } catch (e) {
      console.error(e);
      alert('Failed to generate barcode');
    }
  }

  download() {
    // Safer export: draw label using canvas and render the barcode SVG alone as an image.
    if (!this.barcodeEl) {
      alert('No barcode available. Please generate first.');
      return;
    }

    const width = 600;
    const height = 420;
    const dpr = window.devicePixelRatio || 1;

    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      alert('Failed to create canvas');
      return;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // Top dashed line
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(12, 20);
    ctx.lineTo(width - 12, 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Text
    ctx.fillStyle = '#222';
    ctx.font = '14px Arial';
    ctx.fillText(this.fields.customerPo || 'Customer / PO#', 14, 44);
    ctx.font = '12px Arial';
    ctx.fillText(this.fields.custReference || 'Cust.Reference', 14, 64);

    ctx.font = 'bold 18px Arial';
    ctx.fillText(this.fields.styleModel || 'Style/Model No.', 14, 92);

    ctx.font = '12px Arial';
    ctx.fillText(this.fields.leather || 'Leather', 14, 114);

    ctx.font = 'bold 14px Arial';
    ctx.fillText(this.fields.color || 'Color', 14, 136);
    ctx.fillText(this.fields.size || 'Size', 14, 156);

    // Draw barcode SVG as image
    try {
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(this.barcodeEl.nativeElement as any);
      const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        const bw = width - 120;
        const bh = 80;
        const bx = Math.round((width - bw) / 2);
        const by = height - bh - 60;
        ctx.drawImage(img, bx, by, bw, bh);

        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.barcodeValue || '', width / 2, by + bh + 22);

        try {
          const png = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = png;
          a.download = `${this.barcodeValue || 'barcode'}.png`;
          a.click();
          URL.revokeObjectURL(url);
        } catch (e) {
          console.error(e);
          // fallback: download raw SVG of barcode only
          const fallbackBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
          const fallbackUrl = URL.createObjectURL(fallbackBlob);
          const a = document.createElement('a');
          a.href = fallbackUrl;
          a.download = `${this.barcodeValue || 'barcode'}.svg`;
          a.click();
          URL.revokeObjectURL(fallbackUrl);
          alert('Export to PNG failed due to browser restrictions. An SVG of the barcode was downloaded instead.');
        }
      };

      img.onerror = (err) => {
        console.error('Barcode image rendering failed', err);
        alert('Failed to render barcode image for export');
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      console.error(err);
      alert('Failed to export label');
    }
  }

  // If a barcode encodes multiple fields separated by |, apply them to the form and re-render
  applyParsedScan(value: string) {
    if (!value) return;
    const parts = value.split('|').map((p: string) => p.trim());
    if (parts.length >= 4) {
      this.fields.styleModel = parts[0] || this.fields.styleModel;
      this.fields.leather = parts[1] || this.fields.leather;
      this.fields.color = parts[2] || this.fields.color;
      this.fields.size = parts[3] || this.fields.size;
      if (parts[4]) this.fields.barcode = parts[4];
    } else if (parts.length === 1) {
      this.fields.barcode = parts[0];
    }
    this.render();
  }

  ngOnDestroy(): void {
    window.removeEventListener('barcode:apply', this._applyListener as EventListener);
  }
}
