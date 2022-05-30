import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';

@Component({
  selector: 'app-inter-by-year',
  templateUrl: './inter-by-year.component.html',
  styleUrls: ['./inter-by-year.component.css']
})
export class InterByYearComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['2020', '2021'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  tempData : any = [];

  constructor( private dashService : DashboardServiceService) { }

  ngOnInit() {
    /*this.dashService.getTotalInterByYear(2020).subscribe(
      (res) => {this.tempData = res; this.pieChartData.push(this.tempData.data[0].register)}
    );

    this.dashService.getTotalInterByYear(2021).subscribe(
      (res) => {this.tempData = res; this.pieChartData.push(this.tempData.data[0])}
    )*/

    this.pieChartData.push(3);
    this.pieChartData.push(2);
  }

}
