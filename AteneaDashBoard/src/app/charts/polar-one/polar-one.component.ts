import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { DashboardServiceService } from '../../services/dashboard-service.service';
@Component({
  selector: 'app-polar-one',
  templateUrl: './polar-one.component.html',
  styleUrls: ['./polar-one.component.css']
})
export class PolarOneComponent implements OnInit {

  public chartInformation : any = [];

  public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales' ];
  public polarAreaChartData: SingleDataSet = [300, 500];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor(private dashboardService : DashboardServiceService) { }

  ngOnInit() {
    this.dashboardService.getTotalReportsByYear().subscribe(
      (res) => { this.chartInformation = res ;
        
        this.polarAreaChartLabels[0] = this.chartInformation.data[0].year
        this.polarAreaChartLabels[1] = this.chartInformation.data[1].year
      
        this.polarAreaChartData[0] = this.chartInformation.data[0].total
        this.polarAreaChartData[0] = this.chartInformation.data[1].total
      }
    )
  }
}
