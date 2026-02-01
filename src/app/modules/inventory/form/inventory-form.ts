import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../../core/services/inventory.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-form.html',
  styleUrls: ['./inventory-form.scss']
})
export class InventoryForm implements OnInit {
  fb = inject(FormBuilder);
  is = inject(InventoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  form = this.fb.group({ sku: ['', Validators.required], description: [''], qty: [0], location: [''] });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // load if id
  }

  save() { console.log('Save Inventory', this.form.value); this.router.navigate(['/inventory']); }
  cancel() { this.router.navigate(['/inventory']); }
}
