import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-cor-mai-year-grup',
  templateUrl: './cor-mai-year-grup.component.html',
  styleUrls: ['./cor-mai-year-grup.component.css']
})
export class CorMaiYearGrupComponent implements OnInit {

  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['200', '300', '400', '500', '600', '700', '800'];

  public radarChartData: ChartDataSets[] = [
    { data: [15000, 3000, 0, 1200, 500, 1300, 40], label: '2020' },
    { data: [1000, 16000, 500, 150, 25000, 16000, 100], label: '2021' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() { }
  ngOnInit(){ }
}
