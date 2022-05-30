import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-radar-one',
  templateUrl: './radar-one.component.html',
  styleUrls: ['./radar-one.component.css']
})
export class RadarOneComponent implements OnInit {


  public chartInformation : any = [];


  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['C - Correcte', 'NC - No Correcte', 'NA - No Aplica', 'NR - No Revisat'];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
    { data: [], label: 'Series B' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor( private dashboardService : DashboardServiceService ) { }

  ngOnInit() {
    this.dashboardService.getTotalCorrect().subscribe(
      (res) => {this.chartInformation = res;
        this.radarChartData[0].data?.push(this.chartInformation.data[0].total)
        this.radarChartData[0].label = this.chartInformation.data[0].year

        this.radarChartData[1].data?.push(this.chartInformation.data[1].total)
        this.radarChartData[1].data?.push(this.chartInformation.data[2].total)
        this.radarChartData[1].label = this.chartInformation.data[1].year
       
      }
    )
  }

}
