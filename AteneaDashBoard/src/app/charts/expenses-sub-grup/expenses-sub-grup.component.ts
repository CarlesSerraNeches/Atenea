import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardServiceService } from '../../services/dashboard-service.service';

@Component({
  selector: 'app-expenses-sub-grup',
  templateUrl: './expenses-sub-grup.component.html',
  styleUrls: ['./expenses-sub-grup.component.css']
})
export class ExpensesSubGrupComponent implements OnInit {

  infoChart2020 : any = [];
  infoChart2021 : any = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [ { data: [], label: '' },{ data: [], label: '' }];

  constructor(private DashService : DashboardServiceService) { }


  ngOnInit() {
    this.DashService.getTotalExpensesSubGrup2().subscribe(
      (res) => {this.infoChart2020 = res; console.log(this.infoChart2020)
    
        this.barChartLabels.push(this.infoChart2020.data[0].Grup)
        this.barChartLabels.push(this.infoChart2020.data[1].Grup)
        this.barChartLabels.push(this.infoChart2020.data[3].Grup)
        this.barChartLabels.push(this.infoChart2020.data[4].Grup)

        this.barChartData[0].data?.push(this.infoChart2020.data[0].totalGroup)
        this.barChartData[0].data?.push(this.infoChart2020.data[1].totalGroup)
        this.barChartData[0].data?.push(this.infoChart2020.data[2].totalGroup)
        this.barChartData[0].data?.push(this.infoChart2020.data[3].totalGroup)      
      }
    )
  }

}
