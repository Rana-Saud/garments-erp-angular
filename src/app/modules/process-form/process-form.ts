import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-process-form',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './process-form.html',
  styleUrl: './process-form.scss',
})
export class ProcessForm implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  isEditMode = false;
  processId: number | null = null;

  processForm = this.fb.group({
    processId: [0],
    processType: ['', [Validators.required]],
    process: ['', [Validators.required]],
    processNick: ['', [Validators.required]],
    standardTime: [0, [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
    processSequence: [0, [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
    barcodeTerminal: ['No', [Validators.required]],
    status: ['Active', [Validators.required]],
    productCategory: ['', [Validators.required]],
    deptType: ['In-House', [Validators.required]],
    pieceRate: [0, [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
    pieceOverhead: [0, [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
  });

  rateTableData: any[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.processId = params['id'];
        this.loadProcessData(params['id']);
      }
    });
  }

  loadProcessData(id: number) {
    // Replace with API call
    const mockData = {
      processId: id,
      processType: 'Production',
      process: 'Leather Cutting',
      processNick: 'L/CUT',
      standardTime: 1,
      processSequence: 1.1,
      barcodeTerminal: 'Yes',
      status: 'Active',
      productCategory: 'Leather Jacket Biker Women',
      deptType: 'In-House',
      pieceRate: 90,
      pieceOverhead: 0,
    };
    this.processForm.patchValue(mockData);
    this.loadRateTableData();
  }

  loadRateTableData() {
    // Mock data for rate table
    this.rateTableData = [
      {
        process: 'Leather Cutting',
        productCategory: 'Leather Jacket Biker Women',
        deptType: 'In-House',
        pieceRate: 90,
        pieceOverhead: 0,
        status: 'Active'
      },
      {
        process: 'Leather Cutting',
        productCategory: 'Leather Jacket Biker Men',
        deptType: 'In-House',
        pieceRate: 100,
        pieceOverhead: 0,
        status: 'Active'
      },
      {
        process: 'Leather Cutting',
        productCategory: 'Leather Jacket Biker Men',
        deptType: 'CMT',
        pieceRate: 90,
        pieceOverhead: 50,
        status: 'Active'
      }
    ];
  }

  addRateEntry() {
    const formData = this.processForm.value;
    this.rateTableData.push({
      process: formData.process,
      productCategory: formData.productCategory,
      deptType: formData.deptType,
      pieceRate: formData.pieceRate,
      pieceOverhead: formData.pieceOverhead,
      status: formData.status
    });
    this.clearRateFields();
  }

  clearRateFields() {
    this.processForm.patchValue({
      productCategory: '',
      deptType: 'In-House',
      pieceRate: 0,
      pieceOverhead: 0
    });
  }

  deleteRateEntry(index: number) {
    this.rateTableData.splice(index, 1);
  }

  onSubmit() {
    if (this.processForm.valid && this.rateTableData.length > 0) {
      console.log('Process Form Value:', this.processForm.value);
      console.log('Rate Table Data:', this.rateTableData);
      // Add API call here
      this.router.navigate(['/process']);
    }
  }

  onCancel() {
    this.router.navigate(['/process']);
  }

  goBackToList() {
    this.router.navigate(['/process']);
  }

  onReset() {
    this.processForm.reset({
      deptType: 'In-House',
      status: 'Active',
      barcodeTerminal: 'No',
      pieceOverhead: 0
    });
  }
}
