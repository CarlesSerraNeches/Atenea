import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-line-one',
  templateUrl: './line-one.component.html',
  styleUrls: ['./line-one.component.css']
})
export class LineOneComponent implements OnInit {

  public chartInformation : any = [];


  public lineChartData: ChartDataSets[] = [
    { data: [13,3], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private dashboardService : DashboardServiceService) { }

  ngOnInit() {
    this.dashboardService.getTotalReportsByStatus().subscribe(
      (res) => { this.chartInformation = res;
        this.lineChartLabels[0] = this.chartInformation.data[0].status
        this.lineChartLabels[1] = this.chartInformation.data[1].status

       /* this.lineChartData[0].data = this.chartInformation.data[0].total
        this.lineChartData[0].data?.push(this.chartInformation.data[0].total);*/
      }
    )

  }

}
