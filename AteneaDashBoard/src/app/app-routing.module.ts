import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashCorrectiveComponent } from './dash-corrective/dash-corrective.component';
import { DashInspeccionsComponent } from './dash-inspeccions/dash-inspeccions.component';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent }, { path: 'corrective', component: DashCorrectiveComponent }, { path: 'inspeccions', component: DashInspeccionsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
