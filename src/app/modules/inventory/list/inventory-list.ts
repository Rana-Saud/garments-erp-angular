import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../../core/services/inventory.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.scss']
})
export class InventoryList implements OnInit {
  is = inject(InventoryService);
  items: any[] = [];

  ngOnInit() {
    this.is.getItems().subscribe(d => this.items = d);
  }
}
