import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { CardComponent } from './card/card.component';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TotalExpensesByGroupComponent } from './charts/total-expenses-by-group/total-expenses-by-group.component';
import { TotalExpensesByYearComponent } from './charts/total-expenses-by-year/total-expenses-by-year.component';
import { ExpensesSubGrupComponent } from './charts/expenses-sub-grup/expenses-sub-grup.component';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashCorrectiveComponent } from './dash-corrective/dash-corrective.component';
import { CorMaiYearGrupComponent } from './charts/cor-mai-year-grup/cor-mai-year-grup.component';
import { InterByYearComponent } from './charts/inter-by-year/inter-by-year.component';
import { DashInspeccionsComponent } from './dash-inspeccions/dash-inspeccions.component';
import { PolarOneComponent } from './charts/polar-one/polar-one.component';
import { LineOneComponent } from './charts/line-one/line-one.component';
import { RadarOneComponent } from './charts/radar-one/radar-one.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardComponent,
    MiniCardComponent,
    LineChartComponent,
    TotalExpensesByGroupComponent,
    TotalExpensesByYearComponent,
    ExpensesSubGrupComponent,
    NavComponent,
    OrdersTableComponent,
    DashCorrectiveComponent,
    CorMaiYearGrupComponent,
    InterByYearComponent,
    DashInspeccionsComponent,
    PolarOneComponent,
    LineOneComponent,
    RadarOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ChartsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
