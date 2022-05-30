import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-dash-corrective',
  templateUrl: './dash-corrective.component.html',
  styleUrls: ['./dash-corrective.component.css']
})
export class DashCorrectiveComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  totalExpenses : any = [];
  totalExpensesLastMonth : any = [];
  elementMostProblematic : any = [];
  elementMostCheaper : any = [];
  
  constructor(private breakpointObserver: BreakpointObserver, private DashService : DashboardServiceService) {}

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
      (res) => {this.elementMostProblematic = res; console.log(this.elementMostProblematic)},
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
