import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-total-expenses-by-group',
  templateUrl: './total-expenses-by-group.component.html',
  styleUrls: ['./total-expenses-by-group.component.css']
})
export class TotalExpensesByGroupComponent implements OnInit {

  ChartInformation : any = [];

  // Y - values
  public lineChartData: ChartDataSets[] = [ 
    {data: [], label: '', lineTension: 0}];
  // X - values
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = { responsive: false };
  public lineChartColors: Color[] = [ { borderColor: 'blue'} ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private dashboardService : DashboardServiceService) { }

  ngOnInit() {
    this.dashboardService.getTotalExpensesByYear().subscribe(
      (res) => {this.ChartInformation = res;

        this.lineChartLabels.push(this.ChartInformation.data[0].year)
        this.lineChartLabels.push(this.ChartInformation.data[1].year)
        this.lineChartLabels.push(this.ChartInformation.data[2].year)
        this.lineChartLabels.push(this.ChartInformation.data[3].year)

        this.lineChartData[0].data?.push(this.ChartInformation.data[0].total)
        this.lineChartData[0].data?.push(this.ChartInformation.data[1].total)
        this.lineChartData[0].data?.push(this.ChartInformation.data[2].total)
        this.lineChartData[0].data?.push(this.ChartInformation.data[3].total)

      }
    )
  }
}