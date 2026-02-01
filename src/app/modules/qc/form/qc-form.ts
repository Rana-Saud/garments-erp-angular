import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QcService } from '../../../core/services/qc.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qc-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './qc-form.html',
  styleUrls: ['./qc-form.scss']
})
export class QcForm implements OnInit {
  fb = inject(FormBuilder);
  qs = inject(QcService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  form = this.fb.group({ woNo: ['', Validators.required], inspected: [0], failed: [0], remarks: [''] });

  ngOnInit() {}
  save() { console.log('QC Save', this.form.value); this.router.navigate(['/qc']); }
  cancel() { this.router.navigate(['/qc']); }
}
