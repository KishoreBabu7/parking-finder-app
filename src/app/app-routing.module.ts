import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParkingComponent } from './parking/parking.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ReportComponent } from './report/report.component';
import { PaymentComponent } from './payment/payment.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'parking', component: ParkingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  // Add Payment route
  { path: 'payment', component: PaymentComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent},
  // Admin, User, and Report routes
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'report', component: ReportComponent },

  // Wildcard route (for non-existent routes)
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
