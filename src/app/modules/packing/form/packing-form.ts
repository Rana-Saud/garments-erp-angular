import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packing-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './packing-form.html',
  styleUrls: ['./packing-form.scss']
})
export class PackingForm implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);

  form = this.fb.group({ shipment: ['', Validators.required], woNo: [''], qty: [0], status: ['Ready'] });

  ngOnInit() {}
  save() { console.log('Packing Save', this.form.value); this.router.navigate(['/packing']); }
  cancel() { this.router.navigate(['/packing']); }
}
