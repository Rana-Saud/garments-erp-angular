import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingService } from '../../../core/services/packing.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-packing-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './packing-list.html',
  styleUrls: ['./packing-list.scss']
})
export class PackingList implements OnInit {
  ps = inject(PackingService);
  list: any[] = [];
  ngOnInit() { this.ps.get().subscribe(d => this.list = d); }
}
