import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QcService } from '../../../core/services/qc.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-qc-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './qc-list.html',
  styleUrls: ['./qc-list.scss']
})
export class QcList implements OnInit {
  qs = inject(QcService);
  list: any[] = [];
  ngOnInit() { this.qs.get().subscribe(d => this.list = d); }
}
