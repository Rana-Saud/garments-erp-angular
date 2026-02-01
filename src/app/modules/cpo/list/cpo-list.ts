import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BarcodeLabelComponent, BarcodeLabel } from '../../../shared/components/barcode-label/barcode-label';

@Component({
  selector: 'app-cpo',
  standalone: true,
  imports: [CommonModule, BarcodeLabelComponent, RouterLink],
  templateUrl: './cpo-list.html',
  styleUrls: ['./cpo-list.scss'],
})
export class CpoList implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  @ViewChild(BarcodeLabelComponent) barcodeComponent!: BarcodeLabelComponent;

  cpoList: any[] = [];
  selectedBarcodeCpo: BarcodeLabel | null = null;
  showBarcodeModal = false;

  ngOnInit() {
    this.loadCpoData();
  }

  loadCpoData() {
    // Mock data - replace with API call
    this.cpoList = [
      {
        id: 1,
        cpoNo: 'CPO001',
        cpoDate: '2024-01-15',
        merchandiser: 'John Doe',
        customer: 'Acme Corp',
        styleNo: 'STL001',
        color: 'Red',
        size: 'M',
        quantity: 100,
        unitPrice: 50.0,
        status: 'Active',
      },
      {
        id: 2,
        cpoNo: 'CPO002',
        cpoDate: '2024-01-16',
        merchandiser: 'Jane Smith',
        customer: 'Global Trade',
        styleNo: 'STL002',
        color: 'Blue',
        size: 'L',
        quantity: 150,
        unitPrice: 45.0,
        status: 'Active',
      },
      {
        id: 3,
        cpoNo: 'CPO003',
        cpoDate: '2024-01-17',
        merchandiser: 'Mike Johnson',
        customer: 'Fashion Hub',
        styleNo: 'STL003',
        color: 'Green',
        size: 'S',
        quantity: 75,
        unitPrice: 55.0,
        status: 'Draft',
      },
    ];
  }

  editCpo(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteCpo(id: number) {
    if (confirm('Are you sure you want to delete this CPO?')) {
      this.cpoList = this.cpoList.filter((cpo) => cpo.id !== id);
      // Add API call here to delete from backend
      console.log('CPO with ID', id, 'deleted');
    }
  }

  getColorBadge(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      Red: '#dc3545',
      Blue: '#0d6efd',
      Green: '#198754',
      Yellow: '#ffc107',
      Black: '#212529',
      White: '#e9ecef',
      Brown: '#8b4513',
      Gray: '#6c757d',
    };
    return colorMap[colorName] || '#6c757d';
  }

  printBarcode(cpo: any) {
    // Create barcode label data
    this.selectedBarcodeCpo = {
      poNumber: cpo.cpoNo,
      custReference: cpo.customer || 'N/A',
      styleNo: cpo.styleNo,
      material: 'Cotton Blend',
      color: cpo.color,
      size: cpo.size,
      barcodeValue: cpo.cpoNo,
    };
    this.showBarcodeModal = true;
  }

  closeBarcodeModal() {
    this.showBarcodeModal = false;
    this.selectedBarcodeCpo = null;
  }
}
