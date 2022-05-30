import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  
  totalExpenses : any = [];
  totalExpensesLastMonth : any = [];
  elementMostProblematic : any = [];
  elementMostCheaper : any = [];

  constructor(private breakpointObserver: BreakpointObserver, private DashService : DashboardServiceService) {

  }

  ngOnInit(){
    this.getTotalExpenses();
    this.getTotalExpensesLatMonth();
    this.getMostProblematic();
    this.getElementMostCheaper();
  }

  getTotalExpenses(){
    this.DashService.getTotalExpenses().subscribe(
      (res) => {this.totalExpenses = res;},
      (err) => {console.log(err)}
    );
  }
  getTotalExpensesLatMonth(){
    this.DashService.getTotalExpensesLastMonth().subscribe(
      (res) => {this.totalExpensesLastMonth = res; },
      (err) => {console.log(err)}
    );
  }
  getMostProblematic(){
    this.DashService.getElementMostProblematic().subscribe(
      (res) => {this.elementMostProblematic = res; console.log(res)},
      (err) => {console.log(err)}
    )
  }

  getElementMostCheaper(){
    this.DashService.getElementMostCheaper().subscribe(
      (res) => {this.elementMostCheaper = res},
      (err) => {console.log(err)}
    )
  }
}
