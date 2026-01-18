import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process',
  imports: [CommonModule],
  templateUrl: './process-list.html',
  styleUrl: './process-list.scss',
})
export class ProcessList implements OnInit {
  router = inject(Router);

  processList: any[] = [];

  ngOnInit() {
    this.loadProcessData();
  }

  loadProcessData() {
    // Mock data - replace with API call
    this.processList = [
      {
        id: 1,
        process: 'Leather Cutting',
        productCategory: 'Leather Jacket Biker Women',
        deptType: 'In-House',
        pieceRate: 90,
        pieceOverhead: 0,
        status: 'Active'
      },
      {
        id: 2,
        process: 'Leather Cutting',
        productCategory: 'Leather Jacket Biker Men',
        deptType: 'In-House',
        pieceRate: 100,
        pieceOverhead: 0,
        status: 'Active'
      },
      {
        id: 3,
        process: 'Leather Cutting',
        productCategory: 'Leather Jacket Biker Men',
        deptType: 'CMT',
        pieceRate: 90,
        pieceOverhead: 50,
        status: 'Active'
      },
      {
        id: 4,
        process: 'Stitching',
        productCategory: 'Leather Jacket Biker Women',
        deptType: 'In-House',
        pieceRate: 120,
        pieceOverhead: 0,
        status: 'Active'
      },
      {
        id: 5,
        process: 'Finishing',
        productCategory: 'Leather Jacket Biker Men',
        deptType: 'Outsource',
        pieceRate: 85,
        pieceOverhead: 15,
        status: 'Active'
      }
    ];
  }

  editProcess(id: number) {
    this.router.navigate(['/process-edit', id]);
  }

  deleteProcess(id: number) {
    if (confirm('Are you sure you want to delete this process?')) {
      this.processList = this.processList.filter(process => process.id !== id);
      // Add API call here to delete from backend
    }
  }
}
