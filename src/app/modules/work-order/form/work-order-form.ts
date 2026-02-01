import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkOrderService } from '../../../core/services/workorder.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work-order-form.html',
  styleUrls: ['./work-order-form.scss']
})
export class WorkOrderForm implements OnInit {
  fb = inject(FormBuilder);
  ws = inject(WorkOrderService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  form = this.fb.group({ woNo: ['', Validators.required], style: ['', Validators.required], qty: [0, Validators.required] });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (id) {
      this.ws.getList().subscribe(list => {
        const wo = list.find((x:any)=>x.id===id);
        if (wo) this.form.patchValue(wo);
      });
    }
  }

  save() {
    if (this.form.valid) {
      console.log('Saving WO', this.form.value);
      this.router.navigate(['/workorders']);
    }
  }

  cancel() { this.router.navigate(['/workorders']); }
}
