import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderService } from '../../../core/services/workorder.service';

@Component({
  selector: 'app-work-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-order-detail.html',
  styleUrls: ['./work-order-detail.scss']
})
export class WorkOrderDetail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  ws = inject(WorkOrderService);
  wo: any = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.ws.getList().subscribe(list => {
      this.wo = list.find((x:any)=>x.id===id) || null;
    });
  }

  back() { this.router.navigate(['/workorders']); }
}
