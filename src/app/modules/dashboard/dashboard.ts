import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements AfterViewInit, OnDestroy {
  @ViewChild('barChart', { static: false }) barChartEl!: ElementRef;
  @ViewChild('pieChart', { static: false }) pieChartEl!: ElementRef;

  ds = inject(DashboardService);
  barChart: any = null;
  pieChart: any = null;

  async ngAfterViewInit() {
    const data = await firstValueFrom(this.ds.getSummary()) as any;

    // Wait for echarts to be available via CDN script
    const waitForEcharts = () => new Promise<void>((resolve) => {
      const tryInit = () => {
        if ((window as any).echarts) return resolve();
        setTimeout(tryInit, 100);
      };
      tryInit();
    });


    await waitForEcharts();

    const echarts = (window as any).echarts;
    if (!echarts) return;

    // bar chart
    const barEl = this.barChartEl?.nativeElement;
    if (barEl) {
      this.barChart = echarts.init(barEl);
      const barOpt = {
        title: { text: 'Production - This Week', left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        legend: { top: 40, data: ['Produced','Defects'] },
        xAxis: { type: 'category', data: data.ordersByDay.map((x: any) => x.day) },
        yAxis: { type: 'value' },
        series: [
          { name: 'Produced', type: 'bar', data: data.ordersByDay.map((x: any) => x.produced), itemStyle: { color: '#4CAF50' } },
          { name: 'Defects', type: 'bar', data: data.ordersByDay.map((x: any) => x.defects), itemStyle: { color: '#F44336' } }
        ]
      };
      this.barChart.setOption(barOpt);
    }

    // pie chart
    const pieEl = this.pieChartEl?.nativeElement;
    if (pieEl) {
      this.pieChart = echarts.init(pieEl);
      const dist = data.inventoryDistribution || [{name:'Leather',value:70},{name:'Trims',value:20},{name:'Other',value:10}];
      const pieOpt = {
        tooltip: { trigger: 'item' },
        legend: { top: 10 },
        series: [{ name: 'Inventory', type: 'pie', radius: ['40%','70%'], data: dist, label: { show: true, formatter: '{b}: {d}%' } }]
      };
      this.pieChart.setOption(pieOpt);
    }
  }

  ngOnDestroy() {
    if (this.barChart) this.barChart.dispose();
    if (this.pieChart) this.pieChart.dispose();
  }
}
