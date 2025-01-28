import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParkingComponent } from './parking/parking.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { ReportComponent } from './report/report.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ChallanComponent } from './challan/challan.component';
import { RegisterComponent } from './user-register/register.component';
import { LoginComponent } from './user-login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MonthlyAnalysisComponent } from './monthly-analysis/monthly-analysis.component';
import { MonthlyIncomeComponent } from './monthly-income/monthly-income.component';
import { SpotIncomeComponent } from './spot-income/spot-income.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'parking', component: ParkingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'report', component: ReportComponent },
  { path: 'monthlyanalysis', component: MonthlyAnalysisComponent },
  { path: 'monthlyincome', component: MonthlyIncomeComponent },
  { path: 'spot-income/:spotName', component: SpotIncomeComponent },
  { path: 'challan', component: ChallanComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent }, // Add the user-dashboard route
  { path: '**', redirectTo: '/home' } // Wildcard route at the end
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
