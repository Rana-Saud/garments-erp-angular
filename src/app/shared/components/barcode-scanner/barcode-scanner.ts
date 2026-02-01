import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScanGrid } from '../scan-grid/scan-grid';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcode-scanner.html',
  styleUrl: './barcode-scanner.scss',
  imports: [CommonModule, FormsModule, ScanGrid]
})
export class BarcodeScanner implements OnDestroy {
  readerId = 'qr-reader';
  scanner?: Html5Qrcode;
  scanning = false;
  scans: Array<any> = [];

  // keyboard fallback
  keyboardValue = '';

  availableCameras: Array<any> = [];
  selectedCameraId?: string;

  constructor() {
    Html5Qrcode.getCameras()
      .then(devices => {
        this.availableCameras = devices || [];
        if (this.availableCameras.length) this.selectedCameraId = this.availableCameras[0].id;
      })
      .catch(() => {
        this.availableCameras = [];
      });
  }

  async start(deviceId?: string) {
    if (this.scanning) return;

    // Request permission first, so we can provide a clearer message if denied
    try {
      if (navigator && navigator.mediaDevices && (navigator.mediaDevices as any).getUserMedia) {
        await (navigator.mediaDevices as any).getUserMedia({ video: true });
      }
    } catch (err: any) {
      console.warn('Error getting userMedia, error =', err);
      if (err && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
        alert('Camera permission denied. Please allow camera access in your browser settings or try another device.');
        return;
      }
      alert('Failed to access camera: ' + (err && err.message ? err.message : 'Unknown error'));
      return;
    }

    this.scanner = new Html5Qrcode(this.readerId);
    const cameraConfig: any = deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'environment' };

    this.scanner.start(cameraConfig, { fps: 10 }, (decoded) => this.onScan(decoded), (err) => {})
      .then(() => {
        this.scanning = true;
      })
      .catch(err => {
        console.error(err);
        alert('Camera not available or failed to start scanner');
        this.scanning = false;
      });
  }

  stop() {
    if (!this.scanner || !this.scanning) {
      console.warn('Scanner is not running; nothing to stop');
      return;
    }

    this.scanner.stop()
      .then(() => {
        this.scanning = false;
        try { this.scanner?.clear(); } catch (e) { /* ignore */ }
        this.scanner = undefined;
      })
      .catch(err => {
        console.warn('Failed to stop scanner cleanly', err);
        try { this.scanner?.clear(); } catch (e) { /* ignore */ }
        this.scanner = undefined;
        this.scanning = false;
      });
  }

  onScan(value: string) {
    const parsed = this.parseValue(value);
    this.scans.push(Object.assign({ value, time: new Date() }, parsed));
  }

  parseValue(value: string) {
    const result: any = { parsed: false };
    if (!value) return result;

    const parts = value.split('|').map(p => p.trim());
    if (parts.length >= 4) {
      result.parsed = true;
      result.styleModel = parts[0];
      result.leather = parts[1];
      result.color = parts[2];
      result.size = parts[3];
      if (parts[4]) result.barcode = parts[4];
    } else {
      result.barcode = value;
    }
    return result;
  }

  onKeyboardEnter() {
    if (!this.keyboardValue) return;
    this.onScan(this.keyboardValue.trim());
    this.keyboardValue = '';
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
