import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  form = this.fb.group({ username: ['', Validators.required], role: ['Operator'], email: ['', Validators.email] });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  }

  save() { console.log('Save User', this.form.value); this.router.navigate(['/users']); }
  cancel() { this.router.navigate(['/users']); }
}
