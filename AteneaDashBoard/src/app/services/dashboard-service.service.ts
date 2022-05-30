import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http : HttpClient){}

  getTotalExpenses(){
    return this.http.get('http://localhost/ateneaApi/apI/correctiveMaintenance/dashboardHeader.php?control=1&maiBooId=1');
  }

  getTotalExpensesLastMonth(){
    return this.http.get('http://localhost/ateneaApi/apI/correctiveMaintenance/dashboardHeader.php?control=2&maiBooId=1');
  }

  getElementMostProblematic(){
    return this.http.get('http://localhost/ateneaApi/apI/correctiveMaintenance/dashboardHeader.php?control=3&maiBooId=1');
  }
  
  getElementMostCheaper(){
    return this.http.get('http://localhost/ateneaApi/apI/correctiveMaintenance/dashboardHeader.php?control=4&maiBooId=1');
  }

  getTotalExpensesByYear(){
    return this.http.get<any>('http://localhost/ateneaApi/api/dashboard/ExpensesByYear.php?maiBooId=1');
  }

  getTotalExpensesSubGrup(){
    return this.http.get('http://localhost/ateneaApi/api/dashboard/totalExpensesBySubmodule.php');
  }
  getTotalExpensesSubGrup2(){
    return this.http.get('http://localhost/ateneaApi/api/dashboard/subModule2.php');
  }

  getHistorialCorrectiveMaintenance(){
    return this.http.get('http://localhost/ateneaApi/api/historialCorrectiveMaintenance/view.php');
  }

  getTotalInterByYear(year : number){
    return this.http.get('http://localhost/ateneaApi/api/historialCorrectiveMaintenance/count.php?year=2020');
  }

  getTotalReportsByYear(){
    return this.http.get('http://localhost/ateneaApi/api/historialStandardReport/total.php');
  }
  getTotalReportsByStatus(){
    return this.http.get('http://localhost/ateneaApi/api/historialStandardReport/totaByStatus.php');
  }

  getTotalCorrect(){
    return this.http.get('http://localhost/ateneaApi/api/historialStandardReport/totalCorrect.php');
  }
}
