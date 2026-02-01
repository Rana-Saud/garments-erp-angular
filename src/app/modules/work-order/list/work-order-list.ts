import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderService } from '../../../core/services/workorder.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-work-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './work-order-list.html',
  styleUrls: ['./work-order-list.scss']
})
export class WorkOrderList implements OnInit {
  ws = inject(WorkOrderService);
  router = inject(Router);
  list: any[] = [];

  ngOnInit() {
    this.ws.getList().subscribe(d => this.list = d);
  }

  open(id: number) { this.router.navigate(['/workorder', id]); }
}
