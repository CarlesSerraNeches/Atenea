import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color,Label, SingleDataSet } from 'ng2-charts';
import { Expenses } from 'src/app/models/expenses';

import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-total-expenses-by-year',
  templateUrl: './total-expenses-by-year.component.html',
  styleUrls: ['./total-expenses-by-year.component.css']
})
export class TotalExpensesByYearComponent implements OnInit {

  chartInformation : any = [];
  element : any
  i : number = 1;
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Download Sales', 'In-Store Sales','Download Sales', 'In-Store Sales'];
  public pieChartColors: Color[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dashboardService : DashboardServiceService) { }

  ngOnInit() {
    this.dashboardService.getTotalExpensesSubGrup().subscribe(
      (res) => {this.chartInformation = res;
        
        this.pieChartLabels[0] = this.chartInformation.data[0].Grup
        this.pieChartLabels[0] = this.chartInformation.data[1].Grup
        this.pieChartLabels[0] = this.chartInformation.data[2].Grup
        this.pieChartLabels[0] = this.chartInformation.data[3].Grup

        this.pieChartData[0] = this.chartInformation.data[0].totalGroup
        this.pieChartData[1] = this.chartInformation.data[1].totalGroup
        this.pieChartData[2] = this.chartInformation.data[2].totalGroup
        this.pieChartData[3] = this.chartInformation.data[3].totalGroup
      
      }
    )
  }

}
