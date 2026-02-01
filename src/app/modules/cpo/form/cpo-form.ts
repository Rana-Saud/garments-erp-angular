import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cpo-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './cpo-form.html',
  styleUrls: ['./cpo-form.scss'],
})
export class CpoForm implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  isEditMode = false;
  cpoId: number | null = null;

  orderTypes = ['ANS', 'Repeat'];
  subOrderTypes = ['Normal', 'Special'];
  seasons = ['Summer', 'Winter'];
  currencies = ['USD', 'EUR', 'PKR'];
  paymentTermsList = ['L/C 120 Days', 'TT Advance', 'TT 60 Days'];
  incoterms = ['FOB', 'CNF', 'CIF', 'Ex-Factory'];
  shipmentModes = ['AIR', 'SEA', 'Courier'];
  deliveryTerms = ['Full Shipment Allowed', 'Partial Shipment Allowed'];
  statusList = ['Draft', 'Active', 'Completed', 'Cancelled'];
  sizesMaster = ['XS', 'S', 'M', 'L', 'XL'];

  cpoForm = this.fb.group({
    cpoNo: [{ value: '001/1225', disabled: true }, Validators.required],
    cpoDate: ['', Validators.required],
    merchandiser: ['', Validators.required],
    customer: ['', Validators.required],
    orderType: ['ANS'],
    subOrderType: ['Normal'],
    season: [''],
    selection: [''],
    customerPoNo: [''],
    customerPoDate: [''],
    currency: ['USD'],
    paymentTerm: ['L/C 120 Days'],
    incoterm: ['FOB'],
    shipmentMode: ['SEA'],
    deliveryTerm: ['Full Shipment Allowed'],
    shippingInstruction: [''],
    destination: [''],
    customerStyleNo: [''],
    idlStyleNo: [''],
    styleName: ['Leather Jacket'],
    productCategory: ['Women'],
    product: ['Womens Leather Biker Jacket'],
    mainLeather: ['Sheep Vegas 0.7-0.75 Finish M/G'],
    color: ['Black'],
    customerColor: ['33X Black'],
    gauge: ['33X'],
    finish: [''],
    quantity: [50, Validators.required],
    unitPrice: [109, Validators.required],
    discount: [0],
    deliveryDate: ['', Validators.required],
    paymentTerms: ['Net 30'],
    status: ['Draft'],
    remarks: [''],
    sizes: this.fb.array([]),
    productionInstructions: this.fb.array([]),
  });

  ngOnInit() {
    this.initSizes();
    this.initProduction();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.cpoId = params['id'];
        this.loadCpoData(params['id']);
      } else {
        this.generateCpoNo();
      }
    });
  }

  // ... methods unchanged (kept same behavior as existing CPO form)

  // For brevity the rest of the methods are intentional copies from original
  get sizes(): FormArray { return this.cpoForm.get('sizes') as FormArray; }
  initSizes() {
    const defaultQty = 20;
    this.sizesMaster.forEach(size => {
      this.sizes.push(this.fb.group({ size: [size], orderQty: [defaultQty], extraQty: [0], finalQty: [{ value: defaultQty, disabled: true }] }));
    });
    this.calculateSizeFinalQty();
  }
  calculateSizeFinalQty() {
    this.sizes.controls.forEach(row => {
      row.valueChanges.subscribe(() => {
        const order = Number(row.get('orderQty')?.value) || 0;
        const extra = Number(row.get('extraQty')?.value) || 0;
        row.get('finalQty')?.setValue(order + extra, { emitEvent: false });
      });
    });
  }
  applyExtraQtyPercent() {
    const orderQty = this.cpoForm.get('quantity')?.value || 0;
    const percent = this.cpoForm.get('discount')?.value || 0;
    const extraQty = Math.round(orderQty * percent / 100);
    const perSizeExtra = Math.floor(extraQty / this.sizes.length);
    this.sizes.controls.forEach(row => { const order = row.get('orderQty')?.value || 0; row.get('extraQty')?.setValue(perSizeExtra); row.get('finalQty')?.setValue(order + perSizeExtra); });
  }
  get productionInstructions(): FormArray { return this.cpoForm.get('productionInstructions') as FormArray; }
  initProduction() { this.addProductionRow(); }
  addProductionRow() { this.productionInstructions.push(this.fb.group({ process: [''], instruction: [''] })); }
  removeProductionRow(index: number) { if (this.productionInstructions.length > 1) { this.productionInstructions.removeAt(index); } }
  generateCpoNo() { const cpoNo = 'CPO' + new Date().getTime().toString().slice(-6); this.cpoForm.patchValue({ cpoNo }); }
  loadCpoData(id: number) {
    const mockData = { cpoNo: 'CPO001', cpoDate: '2024-01-15', merchandiser: 'John Doe', customer: 'Acme Corp', styleNo: 'STL001', description: 'Leather Jacket', color: 'Red', size: 'M', quantity: 100, unitPrice: 50, discount: 5, deliveryDate: '2024-02-15', paymentTerms: 'Net 30', status: 'Active', remarks: 'Premium quality leather' };
    this.cpoForm.patchValue(mockData);
  }
  getTotalAmount(): number { const quantity = this.cpoForm.get('quantity')?.value || 0; const unitPrice = this.cpoForm.get('unitPrice')?.value || 0; const discount = this.cpoForm.get('discount')?.value || 0; return (quantity * unitPrice) * (1 - discount / 100); }
  onSubmit() { if (this.cpoForm.invalid) { this.cpoForm.markAllAsTouched(); return; } console.log(this.cpoForm.getRawValue()); }
  onCancel() { this.router.navigate(['/cpo']); }
  goBackToList() { this.router.navigate(['/cpo']); }
  onReset() { if (this.isEditMode) { this.loadCpoData(this.cpoId!); } else { this.cpoForm.reset({ paymentTerms: 'Net 30', status: 'Draft' }); this.generateCpoNo(); } }
}
